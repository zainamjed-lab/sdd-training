# Implementation Plan: About Us Page

**Spec**: [spec.md](./spec.md)
**Status**: Approved

---

## Architecture Overview

```
Browser
  │
  └── GET /about.html
        │
        ├── Express static middleware
        │     └── src/frontend/about.html
        │
        ├── GET /css/about.css
        │     └── src/frontend/css/about.css
        │
        └── GET /images/logo.webp
              └── src/frontend/images/logo.webp
```

No JavaScript. No API calls. Pure static delivery via the existing Express static file server.

## Technology Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Rendering | Static HTML | No auth needed; no dynamic data; fastest possible delivery |
| Styling | Dedicated `about.css` | Avoids polluting the shared auth `styles.css` |
| JavaScript | None | Page is informational only; no interaction requiring JS |
| Responsive layout | CSS Grid + media queries | No framework dependency; full control over breakpoints |
| AWS branding | Custom CSS variables (`--aws`, `--aws-dark`) | Matches AWS brand guidelines without a third-party library |

## Page Section Breakdown

```
about.html
├── <nav class="nav">              Sticky top bar — logo + links + CTA
├── <section class="hero">         Full-width dark hero with badge + headline + CTAs
├── <div class="stats-strip">      4-metric proof strip (dark background)
├── <section class="section">      Who We Are — 2-col grid (text + credentials panel)
├── <section class="section-alt">  Services — 6-card grid (light background)
├── <section class="aws-section">  AWS Partnership — badge block + competency chips
├── <section class="section">      Why Choose Us — 4-card grid
├── <section class="cta-section">  CTA — gradient purple, consultation + login links
└── <footer class="footer">        Copyright + nav links
```

## CSS Architecture (`about.css`)

| Block | Purpose |
|-------|---------|
| `:root` | AWS + brand colour tokens |
| `.nav` | Sticky dark navbar |
| `.hero` | Gradient hero with radial highlight overlay |
| `.stats-strip` / `.stats-grid` / `.stat` | Dark proof-points row |
| `.section`, `.section-alt`, `.aws-section` | Section wrappers with alternating backgrounds |
| `.about-grid` | 2-column who-we-are layout |
| `.about-visual` / `.cert-list` | Dark credentials panel |
| `.services-grid` / `.service-card` | 3-column service cards with hover lift |
| `.aws-tier-badge` | Gradient gold badge block |
| `.competency-grid` / `.competency-item` | 2-column chip list |
| `.why-grid` / `.why-card` | 4-column differentiator cards |
| `.cta-section` | Purple gradient CTA banner |
| `.footer` | Dark footer |
| `@media` rules | 768 px (2-col → 1-col) and 480 px (stats 2-col) |

## Module Breakdown

```
src/frontend/
├── about.html          New — the About Us page
├── css/
│   └── about.css       New — standalone stylesheet for this page
└── images/
    └── logo.webp       Existing — reused in nav bar

src/frontend/dashboard.html   Modified — "About Us" link added to topbar
.specify/memory/constitution.md  Modified — Article I strengthened
```

## Security Considerations

- No user input on this page — no XSS surface.
- No credentials, tokens, or sensitive data exposed.
- `mailto:` link in CTA is the only external interaction.

## Testing Strategy

- **Visual**: Open in browser at 1440 px, 768 px, and 375 px — confirm layout integrity.
- **Links**: Verify anchor links (`#services`, `#aws-partnership`, `#contact`) scroll correctly.
- **Nav link**: Confirm "About Us" link appears in dashboard topbar and navigates correctly.
- **No-auth access**: Confirm `/about.html` loads without a JWT token.
