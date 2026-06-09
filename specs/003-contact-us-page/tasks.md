# Tasks: Contact Us Page

**Spec**: [spec.md](./spec.md) | **Plan**: [plan.md](./plan.md)
**Total**: 8 tasks

---

## Phase 1 — Styles

- [x] **Task 01**: Create `contact.css` — tokens, nav, hero, stat chips, section grid
  - Files: `src/frontend/css/contact.css`
  - Test: Nav renders dark; hero shows headline; stat chips display inline.

- [x] **Task 02**: Add form panel, info panel, contact detail rows, steps list, success card, footer, responsive breakpoint
  - Files: `src/frontend/css/contact.css`
  - Test: At 768 px columns stack; success card hidden by default; steps numbered correctly.

## Phase 2 — HTML

- [x] **Task 03**: Build `<nav>` and hero section with stat chips and CTA button
  - Files: `src/frontend/contact.html`
  - Test: Nav logo displays; stat chips show response time and availability; CTA scrolls to form.

- [x] **Task 04**: Build contact form — all fields, subject dropdown, textarea with char counter placeholder
  - Files: `src/frontend/contact.html`
  - Test: All 6 fields render; dropdown shows 6 options; textarea present.

- [x] **Task 05**: Build info panel — contact details (email, phone, address, hours) and 3-step "What Happens Next"
  - Files: `src/frontend/contact.html`
  - Test: 3 contact detail rows visible; 3 numbered steps render correctly.

- [x] **Task 06**: Add success card (hidden) and footer
  - Files: `src/frontend/contact.html`
  - Test: `#success-card` exists in DOM with `hidden` class; footer renders with links.

## Phase 3 — JavaScript

- [x] **Task 07**: Create `contact.js` — validation, inline errors, char counter, submit handler
  - Files: `src/frontend/js/contact.js`
  - Test: Empty submit shows errors on all required fields. Valid submit hides form and shows success card. Char counter updates on keystroke.

## Phase 4 — Integration

- [x] **Task 08**: Add "Contact Us" link to `about.html` nav and `dashboard.html` topbar
  - Files: `src/frontend/about.html`, `src/frontend/dashboard.html`
  - Test: Both pages show Contact Us link; clicking navigates to `/contact.html`.
