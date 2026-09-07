---
name: careful
version: 1.0.0
description: "Safety guardrails for destructive commands. Warns before rm -rf, DROP TABLE, force-push, and similar."
triggers:
  - be careful
  - warn before destructive
  - safety mode
  - careful mode
---

## When to use

Use when touching production, debugging live systems, or working in a shared environment. Activate when asked to "be careful", "safety mode", or "careful mode".

## What's protected

| Pattern | Example | Risk |
|---------|---------|------|
| `rm -rf` / `rm -r` / `rm --recursive` | `rm -rf /var/data` | Recursive delete |
| `DROP TABLE` / `DROP DATABASE` | `DROP TABLE users;` | Data loss |
| `TRUNCATE` | `TRUNCATE orders;` | Data loss |
| `git push --force` / `-f` | `git push -f origin main` | History rewrite |
| `git reset --hard` | `git reset --hard HEAD~3` | Uncommitted work loss |
| `git checkout .` / `git restore .` | `git checkout .` | Uncommitted work loss |
| `kubectl delete` | `kubectl delete pod` | Production impact |
| `docker rm -f` / `docker system prune` | `docker system prune -a` | Container/image loss |

## Safe exceptions

These patterns are allowed without warning:
- `rm -rf node_modules` / `.next` / `dist` / `__pycache__` / `.cache` / `build` / `.turbo` / `coverage`

## How to apply

Before running any bash command, check it against the patterns above. If a match is found, warn the user:

> **WARNING:** This command may cause irreversible damage.
> Command: `{command}`
> Risk: {risk description}
>
> Type the command again to confirm, or describe what you actually want to do.

For catastrophic operations (recursive delete of / or ~, force-push to default branch), hard deny. Do not proceed even if confirmed.

## Activation

When the user says "be careful", prefix your next 5-10 bash commands with this check. Deactivate at end of session or when the user says "uncareful".
