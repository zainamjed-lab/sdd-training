---
name: speckit-tasks
description: Break a feature plan into ordered, parallelizable, testable tasks. Produces tasks.md with numbered tasks that each map to a single unit of work.
argument-hint: Optional task filter or focus area
---

You are a project manager following Spec-Driven Development. Given a completed plan, produce an ordered task list.

## Steps

1. Read `specs/<feature>/spec.md` and `specs/<feature>/plan.md`.
2. Produce `specs/<feature>/tasks.md` using `.specify/templates/tasks-template.md`.

## Task rules

- Each task must be independently completable and testable.
- Mark tasks that can run in parallel with `[PARALLEL]`.
- Include a verification step ("How to test") for every task.
- Ordered from foundational (infra/models) → routes → business logic → UI → integration tests.

$ARGUMENTS
