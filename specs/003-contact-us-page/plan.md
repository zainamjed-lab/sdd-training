# Implementation Plan: Contact Us Page

**Spec**: [spec.md](./spec.md)
**Status**: Approved

---

## Architecture Overview

```
Browser
  │
  └── GET /contact.html
        │
        ├── Express static middleware
        │     └── src/frontend/contact.html
        │
        ├── GET /css/contact.css
        │     └── src/frontend/css/contact.css
        │
        ├── GET /js/contact.js
        │     └── src/frontend/js/contact.js   (validation + submit handler)
        │
        └── GET /images/logo.webp              (reused)
```

No backend API. Form submission is simulated client-side.

## Technology Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Rendering | Static HTML | No auth, no dynamic data — fastest delivery |
| Styling | Dedicated `contact.css` | Isolated from `styles.css` and `about.css` |
| Validation | Vanilla JS (`contact.js`) | No framework needed for a single form |
| Submit behaviour | Client-side success state | Backend POST deferred to future iteration |

## Page Section Breakdown

```
contact.html
├── <nav>                  Sticky dark nav — logo, links, sign-in CTA
├── <section class="hero"> Headline + subtext + 2 stat chips + CTA button
├── <section class="contact-section">
│     ├── .form-panel      Contact form (left col)
│     │     ├── <form id="contact-form">
│     │     │     ├── Full Name
│     │     │     ├── Work Email
│     │     │     ├── Company
│     │     │     ├── Phone (optional)
│     │     │     ├── Subject <select>
│     │     │     └── Message <textarea> + char counter
│     │     └── #success-card  (hidden until submit)
│     └── .info-panel      Contact details + What Happens Next (right col)
└── <footer>               Copyright + nav links
```

## CSS Architecture (`contact.css`)

| Block | Purpose |
|-------|---------|
| `:root` | Shared colour tokens (mirrors about.css tokens) |
| `.nav` | Reused sticky dark navbar pattern |
| `.hero` | Shorter hero variant (no full-bleed gradient) |
| `.stat-chip` | Inline proof chips (response time, availability) |
| `.contact-section` | 2-col grid wrapper |
| `.form-panel` | White card, form layout |
| `.info-panel` | Dark card, contact details + steps |
| `.contact-detail` | Icon + label + value row |
| `.steps` | Numbered 3-step list |
| `.success-card` | Green confirmation state |
| `@media ≤768px` | Stack to single column |

## Module Breakdown

```
src/frontend/
├── contact.html             New
├── css/contact.css          New
└── js/contact.js            New — validation + submit handler

src/frontend/about.html      Modified — add Contact Us nav link
src/frontend/dashboard.html  Modified — add Contact Us topbar link
```

## Form Validation Logic (`contact.js`)

```
submit event
  │
  ├── validate each required field (empty check)
  ├── validate email format (regex)
  ├── validate message length ≥ 10 chars
  │
  ├── any error → mark field invalid, show inline error, focus first invalid
  │
  └── all valid →
        hide #contact-form
        show #success-card
```

## Security Considerations

- No data is sent anywhere — no XSS or injection risk in this iteration.
- When a backend POST is added, inputs must be sanitised server-side before any storage or email relay.

## Testing Strategy

- **Visual**: Open at 1440 px, 768 px, 375 px — confirm layout at each breakpoint.
- **Validation**: Submit empty form → all required fields show errors. Submit with bad email → email error shown. Submit valid → success card appears.
- **Nav links**: Confirm Contact Us appears in `about.html` nav and `dashboard.html` topbar.
- **Char counter**: Type in textarea → counter updates in real time.
