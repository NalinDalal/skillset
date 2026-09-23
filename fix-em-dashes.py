import os
import sys
import importlib.util

spec = importlib.util.spec_from_file_location('ste_lint', 'scripts/ste-lint.py')
ste_lint = importlib.util.module_from_spec(spec)
spec.loader.exec_module(ste_lint)

files = []
for root, dirs, filenames in os.walk('skills'):
    dirs[:] = [d for d in dirs if d != 'node_modules']
    for f in filenames:
        if f.endswith('.md'):
            files.append(os.path.join(root, f))
for root, dirs, filenames in os.walk('curations'):
    for f in filenames:
        if f.endswith('.md'):
            files.append(os.path.join(root, f))

results = []
for f in files:
    with open(f, 'r', encoding='utf-8') as fh:
        text = fh.read()
    r = ste_lint.lint(text, strict=True)
    if r['total_per100w'] > 5.0:
        results.append(f)

for f in results:
    if not os.path.exists(f):
        print(f'MISSING: {f}')
        continue
    with open(f, 'r', encoding='utf-8') as fh:
        text = fh.read()
    original = text
    lines = text.split('\n')
    in_code = False
    result = []
    for line in lines:
        if line.strip().startswith('```'):
            in_code = not in_code
        if not in_code:
            line = line.replace('—', ', ')
            line = line.replace('–', '-')
        result.append(line)
    text = '\n'.join(result)
    if text != original:
        with open(f, 'w', encoding='utf-8') as fh:
            fh.write(text)
        print(f'Fixed: {f}')
    else:
        print(f'No change: {f}')
