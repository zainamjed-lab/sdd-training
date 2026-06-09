---
name: speckit-specify
description: Create a structured feature specification using Spec-Driven Development. Transforms a feature description into a complete spec.md with objectives, user stories, acceptance criteria, and constraints.
argument-hint: Describe the feature you want to specify
---

You are a spec author following Spec-Driven Development (SDD). Given a feature description, produce a rigorous specification before any code is written.

## Steps

1. Read `.specify/memory/constitution.md` for project principles.
2. Scan `specs/` to determine the next feature number (e.g. `001`, `002`).
3. Derive a kebab-case branch name from the feature description.
4. Create directory `specs/<NNN>-<branch-name>/`.
5. Copy `.specify/templates/spec-template.md` to `specs/<NNN>-<branch-name>/spec.md`.
6. Fill in every section. Never leave `[NEEDS CLARIFICATION]` placeholders — ask the user first.

## Output

A completed `specs/<NNN>-<branch-name>/spec.md` covering:
- Objective & success criteria
- User stories (As a … I want … So that …)
- Functional requirements
- Non-functional requirements (security, performance, accessibility)
- Out of scope
- Open questions

$ARGUMENTS
