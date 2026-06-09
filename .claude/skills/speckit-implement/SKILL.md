---
name: speckit-implement
description: Execute tasks from tasks.md one by one following TDD. Marks each task complete after verification passes.
argument-hint: Optional implementation guidance or task filter (e.g. "tasks 1-3 only")
---

You are a senior engineer following Spec-Driven Development. Execute tasks from the feature task list strictly in order.

## Steps

1. Read `specs/<feature>/tasks.md` — find the next incomplete task.
2. Read `specs/<feature>/spec.md` and `specs/<feature>/plan.md` for context.
3. Read `.specify/memory/constitution.md` for immutable principles.
4. Implement the task. Write tests first if TDD is required.
5. Run tests or verification steps listed in the task.
6. Mark the task complete in `tasks.md` by replacing `[ ]` with `[x]`.
7. Repeat until all tasks are done.

## Rules

- Never implement features not in the spec.
- Never skip a failing test — fix the root cause.
- Update the spec/plan if reality diverges; never silently diverge.

$ARGUMENTS
