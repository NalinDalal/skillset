# Progress indicators

Rules for choosing and implementing progress indicators. For skeleton
and spinner patterns, see ui-core/references/build.md.

## Determinate vs indeterminate

- Determinate: use when the progress can be measured (upload, install,
  form completion). Shows percentage or step.
- Indeterminate: use when the duration is unknown but progress is
  happening (loading data, processing). Shows animation, no percentage.
- Don't guess: if you don't know the duration, use indeterminate. A
  determinate bar that stalls at 90% is worse than an indeterminate
  spinner.

## Progress bar rules

- Height: 4 to 8px for inline bars, 8 to 12px for standalone bars.
  Thinner bars are subtler. Thicker bars are more prominent.
- Fill direction: left to right for LTR, right to left for RTL. Use
  logical properties or CSS transforms.
- Percentage label: show when the percentage is meaningful (more than
  10% steps). Hide for rapid progress where the number changes faster
  than the user can read it.
- Color: accent color for fill, muted border for track. Don't use
  multiple colors to indicate "health". That's a status indicator, not
  a progress bar.
- Animation: smooth transition between values. Don't jump. 300ms ease
  is fine here because the bar is the feedback, not a micro-interaction.

## Step / wizard indicators

- Linear steps: use when every step must be completed in order
  (onboarding, checkout). Show step number, label, and completion
  state.
- Non-linear steps: use when steps can be skipped or reordered
  (settings, configuration). Show steps as a list, not a progress bar.
- Completed state: checkmark or filled step. Never remove completed
  steps. The user needs to see progress.
- Current step: accent color, larger or bolder. Don't use animation to
  indicate the current step. Animation is for progress, not state.
- Future steps: muted text or outline. Don't gray them out completely.
  The user needs to see what's coming.

## Multi-stage progress

- Multi-stage: use when an operation has distinct phases (upload +
  processing + complete). Show stage name and progress within the
  current stage.
- Stage transition: animate the stage name change, not the bar. The bar
  resets for the new stage.
- Error in multi-stage: show which stage failed, why, and how to retry
  that stage. Don't restart from stage one.

## Skeleton vs spinner vs progress bar

- Skeleton: use when the content shape is known and the load is fast
  (under 2s). See ui-core/references/build.md.
- Spinner: use when the duration is unknown or the load is full-page.
  See ui-core/references/build.md.
- Progress bar: use when the progress is measurable. Don't use a
  spinner when you can show a bar.
- Don't show all three together. Pick one per loading state.

## Don'ts

- Don't use indeterminate progress bars for operations that have a
  known duration. If you know it takes 5 seconds, show a determinate
  bar.
- Don't animate progress bars with spring curves. Linear or ease-out
  only.
- Don't show percentage for very fast operations (under 1s). The
  number changes too fast to read.
- Don't use progress bars for multi-step wizards without showing the
  step names. A bar alone doesn't tell the user where they are.
- Don't hide progress indicators behind hover. Progress is critical
  feedback. It should be visible.
