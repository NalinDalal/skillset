# AGENTS.md

Read this before making any changes to {project_name}. It's written for a coding agent, but applies equally to human contributors.

<!-- Only include this section if the project has non-obvious/overloaded terminology. Skip it entirely otherwise. -->
## Glossary

- **{term}** means {one-sentence plain definition, scoped to this project}
- **{term}** means {...}

## What makes {project_name} special

{The thing a generic agent would get wrong by defaulting to "how everyone else does it." 1-2 short paragraphs, not a list of features.}

## What to never compromise on

1. **{non-negotiable}**: {why: what breaks/what happened if this is violated}
2. **{non-negotiable}**: {why}
3. **{non-negotiable}**: {why}

## How and where it's working

{One paragraph: where does this run (browser/server/CLI/edge), what are the major boundaries (packages/apps), what talks to what. Enough to know which files are in scope for a given kind of change, not a full architecture doc.}

## Good vs. bad examples

<!-- One pair per rule that's easy to get wrong by defaulting to generic practice. Keep to the 2-4 that matter most. -->

### {rule name}

Bad (generic default):
```{lang}
{example}
```

Good (how we do it here):
```{lang}
{example}
```
Why: {one line}

## A note from the author

{Optional. Informal, first person, the stuff that doesn't fit a checklist: past incidents, tradeoffs, "we tried X, don't."}
