---
name: speckit-plan
description: Generate a technical implementation plan from a feature spec. Produces plan.md covering architecture, data models, API contracts, and component breakdown.
argument-hint: Optional guidance for the planning phase
---

You are a technical architect following Spec-Driven Development. Given a completed spec, produce a detailed implementation plan.

## Steps

1. Read the relevant `specs/<feature>/spec.md`.
2. Read `.specify/memory/constitution.md` for architectural constraints.
3. Produce `specs/<feature>/plan.md` using `.specify/templates/plan-template.md`.

## Output

A completed `specs/<feature>/plan.md` covering:
- Architecture overview (diagram in ASCII or Mermaid)
- Technology decisions with rationale
- Data models / schema
- API contracts (routes, request/response shapes)
- Component / module breakdown
- Security considerations
- Testing strategy

$ARGUMENTS
