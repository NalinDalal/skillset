---
name: handwritten-notes
description: Turns the cold email copy in a lead list into handwritten note images, one per lead, to send inside a cold email or a LinkedIn DM. First checks every row for unfilled variables like {{first_name}}, spintax, and other problems, then draws a note for each ready row. Use when someone says "make handwritten notes", "turn my emails into notes", "handwritten images for my list", "handwritten DM", or uploads a lead list (CSV or Google Sheet) and asks for handwritten versions of the copy.
---

# Handwritten Notes

**The rule for everything you do:** a note shows exactly the copy in the row. Never fill a variable, fix a typo, or rewrite a line on your own. If a row is not ready, flag it and say why.

**Who this is for:** an agency owner with a lead list where each row already has its finished, personalised email. The note image *is* the message. It goes inside a cold email or a LinkedIn DM.

## Step 0: Set up (first run only)

Read `ACX/setup-status.md`. If its "Optional tools" list has a `Handwritten notes` line marked `ready`, skip to Step 1.

All commands below run from this skill's folder, so `scripts/notes.py` is the script that ships with this skill.

Otherwise:

1. Check that Python 3 is installed: `python3 --version`. On Windows, try `py --version`. If neither works, stop and tell the member to install Python 3 from python.org, then come back.
2. Run `python3 scripts/notes.py setup --fonts ACX/tools/handwriting/fonts`.
   - If the output says `MISSING_PILLOW`, tell the member: "Pillow is the standard Python library for drawing images. I need it to draw the notes. OK to install it?" On a yes, run `python3 -m pip install --user Pillow`, then run setup again.
   - Setup downloads five free handwriting fonts (about 1.2 MB in total) from Google's official font repository. Running it again is safe. It skips fonts it already has.
3. When the output ends with `SETUP_DONE`, add `- Handwritten notes (Python, Pillow, fonts): ready` under "Optional tools" in `ACX/setup-status.md`.

## Step 1: Get the list

The member gives you a CSV or a Google Sheet.

- **CSV:** use the file as it is.
- **Google Sheet:** read it with Composio's `GOOGLESHEETS_BATCH_GET` and save it as `ACX/outputs/handwritten-notes/source.csv`. Read `../signal-watcher/references/google-sheet.md` for the known problems with Composio's Sheets tools.

Find the column with the email copy. Look for headers such as `email_body`, `email_copy`, `copy`, `message`, or `personalised_email`. Also find the first-name column for file names. Show the member both columns and get a yes before you continue.

## Step 2: Check the copy

Run:

```
python3 scripts/notes.py check --csv LIST.csv --column COPY_COLUMN --out ACX/outputs/handwritten-notes/checked.csv
```

Each row gets one of three results:

| Result | Meaning |
|---|---|
| **Ready** | The copy is complete and fits on one note. |
| **Fix** | Something needs fixing. The reason says what: an unfilled variable (`{{first_name}}`, `{first_name}`, `[Company]`, `%NAME%`), unresolved spintax (`{Hi\|Hey}`), a greeting with no name, a stray space where a variable was blank, an emoji the handwriting cannot draw, or copy too long for one note. |
| **Skip** | The cell is empty. |

Report the counts and show up to five Fix rows with their reasons. If most rows fail for the same reason (for example, every row still has `{{first_name}}`), say so plainly. The list was probably exported before personalisation ran, and the member needs to export the filled-in version.

Do not draw notes for Fix or Skip rows. The member fixes them in the source, then runs the skill again.

## Step 3: Pick the look

Ask the member two questions:

1. **Ink:** blue or black. These are the only two choices.
2. **Handwriting:** one style for every note, or rotate through all five so that notes next to each other look different. Rotate is the default.

| Style | Handwriting | Paper |
|---|---|---|
| `caveat` | Caveat, quick and slanted | plain white |
| `indie` | Indie Flower, round and casual | lined notebook |
| `patrick` | Patrick Hand, neat print | cream |
| `shadows` | Shadows Into Light, thin and tall | graph paper |
| `kalam` | Kalam, relaxed print | plain white |

Example images of each style are in `assets/examples/`. Show them if the member wants to see the styles before choosing.

## Step 4: Practice round

Draw **3 notes first**:

```
python3 scripts/notes.py render --csv LIST.csv --column COPY_COLUMN --name-column FIRST_NAME_COLUMN --fonts ACX/tools/handwriting/fonts --out-dir ACX/outputs/handwritten-notes --ink blue --style rotate --rows 3
```

Show the 3 images and get a yes before you draw the rest. Fixing the look now is cheaper than redrawing 500 notes.

## Step 5: Draw every note

Run the same command without `--rows`. The script saves:

- one image per Ready row: `ACX/outputs/handwritten-notes/<row number>-<first name>.jpg`, 1080×1350 pixels (LinkedIn's portrait size), about 150 KB each
- `ACX/outputs/handwritten-notes/notes-list.csv`: the full list with three new columns, `note_status` (Done, Fix, or Skip), `note_reason`, and `note_image` (the file path)

If the list came from a Google Sheet, write `note_status`, `note_reason`, and `note_image` back as new columns in the same sheet. Append the columns. Never change the member's existing columns.

## Step 6: Hand over, with one warning

Tell the member how many notes were made, where they are, and how many rows still need fixing.

Then give this warning once, in plain words: some email apps, Outlook among them, hide images until the reader allows them, and spam filters distrust emails that are only an image. An email with just the note can land in spam or show up blank. One short line of plain text above the image helps, for example "wrote you a quick note". LinkedIn DMs do not have this problem.

## Rules you hold, whatever the member says

- Never draw a note for a row that failed the check.
- Never fill in, guess, or rewrite any part of the copy.
- Ink is blue or black only.
- Ask before installing anything. Name what it is and why.
