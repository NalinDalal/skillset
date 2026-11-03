"""Check cold email copy in a lead list and turn each ready row into a handwritten note image.

Commands:
  python3 notes.py setup  --fonts DIR
  python3 notes.py check  --csv LIST.csv --column COPY_COLUMN [--out CHECKED.csv]
  python3 notes.py render --csv LIST.csv --column COPY_COLUMN --fonts DIR --out-dir DIR
                          [--ink blue|black] [--style rotate|caveat|indie|patrick|shadows|kalam]
                          [--rows 3] [--name-column first_name]

Needs Python 3.8+ and Pillow. Fonts are free Google Fonts (SIL Open Font License).
"""
import argparse
import csv
import html
import random
import re
import sys
import urllib.request
from pathlib import Path

FONT_SOURCE = "https://raw.githubusercontent.com/google/fonts/main/ofl/"
FONT_FILES = {
    "caveat": ("caveat/Caveat%5Bwght%5D.ttf", "Caveat.ttf"),
    "indie": ("indieflower/IndieFlower-Regular.ttf", "IndieFlower-Regular.ttf"),
    "patrick": ("patrickhand/PatrickHand-Regular.ttf", "PatrickHand-Regular.ttf"),
    "shadows": ("shadowsintolight/ShadowsIntoLight.ttf", "ShadowsIntoLight.ttf"),
    "kalam": ("kalam/Kalam-Regular.ttf", "Kalam-Regular.ttf"),
}
# each handwriting gets its own paper and wobble; ink colour is chosen by the user
STYLES = {
    "caveat": dict(paper="plain", tilt=0.6, wobble=4),
    "indie": dict(paper="lined", tilt=0.8, wobble=3),
    "patrick": dict(paper="cream", tilt=0.5, wobble=3),
    "shadows": dict(paper="grid", tilt=1.0, wobble=4),
    "kalam": dict(paper="plain", tilt=0.7, wobble=3),
}
INKS = {"blue": (28, 52, 160), "black": (22, 22, 30)}

W, H = 1080, 1350  # LinkedIn portrait size; also reads well inline in email
MARGIN_TOP, MARGIN_BOTTOM = 70, 70
MIN_SIZE, MAX_SIZE = 34, 72  # below MIN_SIZE the note is too small to read
MAX_CHARS = 900

# ---------- checking the copy ----------

PLACEHOLDERS = [
    (r"\{\{[^}]*\}\}", "unfilled variable"),
    (r"\{[A-Za-z_][A-Za-z0-9_ ]*\}", "unfilled variable"),
    (r"%[A-Za-z_]+%", "unfilled variable"),
    (r"\[[^\]]*(name|company|first|last|title|city|role)[^\]]*\]", "unfilled variable"),
    (r"\{[^{}|]+\|[^{}]+\}", "spintax not resolved"),
]
LEFTOVERS = [
    (r"^\s*(hi|hey|hello|dear)\s*[,!.]", "greeting has no name (blank variable?)"),
    (r"\s[,.!?]", "space before punctuation (blank variable?)"),
    (r"\S  +\S", "double space (blank variable?)"),
]
SMART = {"‘": "'", "’": "'", "“": '"', "”": '"', "–": "-", "—": "-",
         "…": "...", " ": " "}


def clean(text):
    """Turn email HTML into plain text with line breaks, and swap curly quotes for straight ones."""
    text = text.replace("\r\n", "\n")
    text = re.sub(r"(?i)<br\s*/?>", "\n", text)
    text = re.sub(r"(?i)</p\s*>", "\n\n", text)
    text = re.sub(r"<[^>]+>", "", text)
    text = html.unescape(text)
    for a, b in SMART.items():
        text = text.replace(a, b)
    lines = [ln.rstrip() for ln in text.split("\n")]
    return re.sub(r"\n{3,}", "\n\n", "\n".join(lines)).strip()


def check_copy(raw):
    """Return (status, reason). status is Ready, Fix, or Skip."""
    if not raw or not raw.strip():
        return "Skip", "empty cell"
    text = clean(raw)
    problems = []
    scan = text
    for pattern, why in PLACEHOLDERS:
        m = re.search(pattern, scan, re.I)
        if m:
            problems.append(f"{why}: {m.group(0)}")
            scan = re.sub(pattern, "", scan, flags=re.I)  # so {{x}} is not reported again as {x}
    for pattern, why in LEFTOVERS:
        if re.search(pattern, text, re.I | re.M):
            problems.append(why)
    odd = sorted({c for c in text if ord(c) > 126})
    if odd:
        problems.append("characters the handwriting cannot draw (emoji or symbols): " + " ".join(odd))
    if len(text) > MAX_CHARS:
        problems.append(f"too long for one note ({len(text)} characters, limit {MAX_CHARS})")
    if problems:
        return "Fix", "; ".join(dict.fromkeys(problems))
    return "Ready", ""


# ---------- drawing the note ----------

def need_pillow():
    try:
        import PIL  # noqa: F401
    except ImportError:
        sys.exit("MISSING_PILLOW: install it with: python3 -m pip install --user Pillow")


def make_paper(kind, rng):
    from PIL import Image, ImageDraw
    base = {"plain": (252, 252, 250), "lined": (253, 253, 248), "cream": (250, 245, 232), "grid": (252, 252, 252)}[kind]
    img = Image.new("RGB", (W, H), base)
    px = img.load()
    for _ in range(W * H // 6):  # paper grain
        x, y = rng.randrange(W), rng.randrange(H)
        d = rng.randint(-6, 3)
        r, g, b = px[x, y]
        px[x, y] = (r + d, g + d, b + d)
    if kind == "grid":
        d = ImageDraw.Draw(img)
        for v in range(0, max(W, H), 40):
            d.line([(v, 0), (v, H)], fill=(215, 225, 235), width=1)
            d.line([(0, v), (W, v)], fill=(215, 225, 235), width=1)
    return img


def layout(text, style, ink, fonts_dir, seed, size, extra=0, draw_to=None):
    """Place every word. Returns the y position where the writing ends; draws the note if draw_to is set."""
    from PIL import Image, ImageDraw, ImageFilter, ImageFont
    s = STYLES[style]
    rng = random.Random(seed)
    font = ImageFont.truetype(str(Path(fonts_dir) / FONT_FILES[style][1]), size)
    ascent = font.getmetrics()[0]
    line_h = int(size * 1.25) + extra
    para_gap = 2.0 if s["paper"] == "lined" else 1.55
    margin_l, margin_r = (125 if s["paper"] == "lined" else 65), 65
    ink_layer = Image.new("RGBA", (W, H), (0, 0, 0, 0)) if draw_to else None
    baselines, y = [], MARGIN_TOP

    for para in text.split("\n\n"):
        for line in para.split("\n"):
            x = margin_l + rng.randint(-4, 4)
            drift = rng.uniform(-0.6, 0.6)  # the line slowly drifts up or down
            for word in line.split():
                l, t, r, b = font.getbbox(word)
                pad = 12
                layer = Image.new("RGBA", (r - l + pad * 2, b - t + pad * 2), (0, 0, 0, 0))
                shade = tuple(max(0, min(255, c + rng.randint(-12, 12))) for c in ink)
                ImageDraw.Draw(layer).text((pad - l, pad - t), word, font=font, fill=shade + (rng.randint(215, 245),))
                layer = layer.rotate(rng.uniform(-s["tilt"], s["tilt"]), resample=Image.BICUBIC, expand=True)
                space = int(size * rng.uniform(0.28, 0.4))
                if x + layer.width > W - margin_r and x > margin_l + 20:
                    baselines.append(y + ascent)
                    x = margin_l + rng.randint(-4, 4)
                    y += line_h
                    drift = rng.uniform(-0.6, 0.6)
                dy = int(rng.uniform(-s["wobble"], s["wobble"]) + drift * (x - margin_l) / 40)
                pos = (x, y + t - pad + dy)
                if draw_to and 0 <= pos[1] and pos[1] + layer.height <= H:
                    ink_layer.alpha_composite(layer, pos)
                x += layer.width - 24 + space
            baselines.append(y + ascent)
            y += line_h
        y += int(line_h * (para_gap - 1))
    bottom = y - int(line_h * (para_gap - 1))
    if not draw_to:
        return bottom

    img = make_paper(s["paper"], random.Random(seed + 100))
    if s["paper"] == "lined":  # rule lines sit just under each written line
        d = ImageDraw.Draw(img)
        b = baselines[0] % line_h + 6
        while b < H:
            d.line([(0, b), (W, b)], fill=(170, 200, 230), width=2)
            b += line_h
        d.line([(100, 0), (100, H)], fill=(235, 150, 150), width=2)
    img = img.convert("RGBA")
    img.alpha_composite(ink_layer.filter(ImageFilter.GaussianBlur(0.6)))  # soften so it reads as ink
    img.convert("RGB").save(draw_to, quality=88)
    return bottom


def render_note(text, style, ink, fonts_dir, seed, out_path):
    """Draw one note at the largest size that fits. Returns False if the copy is too long to fit readably."""
    limit = H - MARGIN_BOTTOM
    fits = [sz for sz in range(MIN_SIZE, MAX_SIZE) if layout(text, style, ink, fonts_dir, seed, sz) <= limit]
    if not fits:
        return False
    size = max(fits)
    extra = 0  # spread leftover space into looser line spacing so the page looks full
    while extra < 40 and layout(text, style, ink, fonts_dir, seed, size, extra + 1) <= limit:
        extra += 1
    layout(text, style, ink, fonts_dir, seed, size, extra, draw_to=out_path)
    return True


# ---------- commands ----------

def read_rows(path):
    with open(path, newline="", encoding="utf-8-sig") as f:
        reader = csv.DictReader(f)
        return reader.fieldnames, list(reader)


def cmd_setup(a):
    need_pillow()
    d = Path(a.fonts)
    d.mkdir(parents=True, exist_ok=True)
    for remote, local in FONT_FILES.values():
        dest = d / local
        if dest.exists() and dest.stat().st_size > 10000:
            print(f"ok      {local}")
            continue
        urllib.request.urlretrieve(FONT_SOURCE + remote, dest)
        print(f"fetched {local}")
    print("SETUP_DONE")


def cmd_check(a):
    fields, rows = read_rows(a.csv)
    if a.column not in fields:
        sys.exit(f"Column '{a.column}' not found. Columns: {', '.join(fields)}")
    counts = {"Ready": 0, "Fix": 0, "Skip": 0}
    for row in rows:
        status, reason = check_copy(row[a.column])
        row["note_status"], row["note_reason"] = status, reason
        counts[status] += 1
    out = a.out or a.csv
    with open(out, "w", newline="", encoding="utf-8") as f:
        w = csv.DictWriter(f, fieldnames=[c for c in fields if c not in ("note_status", "note_reason")]
                           + ["note_status", "note_reason"])
        w.writeheader()
        w.writerows(rows)
    print(f"Ready: {counts['Ready']}  Fix: {counts['Fix']}  Skip: {counts['Skip']}  -> {out}")


def cmd_render(a):
    need_pillow()
    fields, rows = read_rows(a.csv)
    out_dir = Path(a.out_dir)
    out_dir.mkdir(parents=True, exist_ok=True)
    names = list(STYLES)
    done = 0
    for i, row in enumerate(rows, 1):
        status, reason = check_copy(row[a.column])
        row["note_image"] = ""
        if status != "Ready":
            row["note_status"], row["note_reason"] = status, reason
            continue
        if a.rows and done >= a.rows:
            continue
        style = names[done % len(names)] if a.style == "rotate" else a.style
        who = re.sub(r"[^A-Za-z0-9]+", "-", row.get(a.name_column, "") or "").strip("-").lower() or "lead"
        path = out_dir / f"{i:04d}-{who}.jpg"
        if render_note(clean(row[a.column]), style, INKS[a.ink], a.fonts, i, path):
            row["note_status"], row["note_reason"], row["note_image"] = "Done", "", str(path)
            done += 1
            print(f"row {i}: {path.name} ({style})")
        else:
            row["note_status"], row["note_reason"] = "Fix", "too long to fit on one note at a readable size"
    out_csv = out_dir / "notes-list.csv"
    extra = ["note_status", "note_reason", "note_image"]
    with open(out_csv, "w", newline="", encoding="utf-8") as f:
        w = csv.DictWriter(f, fieldnames=[c for c in fields if c not in extra] + extra)
        w.writeheader()
        w.writerows(rows)
    print(f"Made {done} notes -> {out_dir}  (list with image paths: {out_csv})")


def main():
    p = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    sub = p.add_subparsers(dest="cmd", required=True)
    s = sub.add_parser("setup")
    s.add_argument("--fonts", required=True)
    c = sub.add_parser("check")
    c.add_argument("--csv", required=True)
    c.add_argument("--column", required=True)
    c.add_argument("--out")
    r = sub.add_parser("render")
    r.add_argument("--csv", required=True)
    r.add_argument("--column", required=True)
    r.add_argument("--fonts", required=True)
    r.add_argument("--out-dir", required=True)
    r.add_argument("--ink", choices=INKS, default="blue")
    r.add_argument("--style", choices=["rotate", *STYLES], default="rotate")
    r.add_argument("--rows", type=int, default=0, help="stop after this many notes (0 = all)")
    r.add_argument("--name-column", default="first_name")
    a = p.parse_args()
    {"setup": cmd_setup, "check": cmd_check, "render": cmd_render}[a.cmd](a)


if __name__ == "__main__":
    main()
