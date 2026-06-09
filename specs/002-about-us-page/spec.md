# Feature Spec: About Us Page

**Feature ID**: 002
**Branch**: 002-about-us-page
**Status**: Approved (retroactive)
**Author**: sdd-training
**Date**: 2026-06-09

---

## Objective

Create a public-facing "About Us" marketing page that communicates the company's identity as a
Managed Service Provider (MSP) and AWS Premier Tier Partner. The page must convey credibility,
showcase services, highlight the AWS partnership tier, and drive visitors toward a consultation CTA.
It is accessible without authentication and linked from the dashboard navigation.

## Success Criteria

- [ ] Page is publicly accessible at `/about.html` — no login required.
- [ ] Hero section displays "AWS Premier Tier Partner" badge and a clear value proposition headline.
- [ ] Stats strip shows at least 4 quantified proof points (years, clients, uptime, certifications).
- [ ] "Who We Are" section explains the MSP + AWS partner identity with a credentials panel.
- [ ] Services grid lists at least 6 managed cloud services with icon, title, and description.
- [ ] AWS Partnership section renders a styled Premier Tier badge with competency chips.
- [ ] "Why Choose Us" section highlights 4 differentiators.
- [ ] CTA section includes a "Schedule a Free Consultation" action and a portal login link.
- [ ] Page is fully responsive down to 375 px viewport width.
- [ ] Dashboard topbar includes an "About Us" navigation link.
- [ ] Logo (`/images/logo.webp`) appears in the navigation bar.

## User Stories

| # | As a… | I want to… | So that… |
|---|-------|-----------|---------|
| 1 | Prospective client | Understand who we are and what we do | I can evaluate whether to engage |
| 2 | Prospective client | See our AWS Partnership tier | I gain confidence in our cloud expertise |
| 3 | Prospective client | Browse our service offerings | I know which service fits my need |
| 4 | Logged-in user | Navigate to About Us from the dashboard | I can share the page with colleagues |
| 5 | Visitor on mobile | Read the page comfortably on a phone | The layout is not broken on small screens |

## Functional Requirements

### Must Have
- FR-01: Static HTML page served by Express at `/about.html`.
- FR-02: Sticky navigation bar with logo, page anchor links, and a "Contact Us" CTA button.
- FR-03: Hero section — badge, headline with highlighted keyword, subtext, two action buttons.
- FR-04: Stats strip — 4 metrics: Years in Business, Enterprise Clients, Uptime SLA, AWS Certifications.
- FR-05: "Who We Are" two-column layout — descriptive text left, credentials panel right.
- FR-06: Services grid — 6 cards: Cloud Migration, Managed Operations, Security & Compliance, Cost Optimisation, DevOps & Automation, Data & Analytics.
- FR-07: AWS Partnership section — Premier Tier badge block left, competency list right.
- FR-08: "Why Choose Us" — 4 cards: Rapid Onboarding, Enterprise Security, Dedicated Support, Strategic Guidance.
- FR-09: CTA section — headline, subtext, "Schedule a Free Consultation" mailto link, portal sign-in link.
- FR-10: Footer — copyright, About link, Portal Login link.
- FR-11: Dashboard topbar — "About Us" anchor link added alongside the Logout button.

### Should Have
- FR-12: Hover animations on service cards (lift + shadow).
- FR-13: `aria-label` on interactive elements; semantic heading hierarchy (h1 → h2 → h3).

### Won't Have (this iteration)
- Dynamic content from a CMS or API
- Contact form with backend submission
- Team member profiles with photos
- Blog or case studies section

## Non-Functional Requirements

| Category | Requirement |
|----------|-------------|
| Performance | Page renders without JavaScript — pure HTML/CSS. |
| Accessibility | Semantic HTML5 landmarks (`<nav>`, `<section>`, `<footer>`). Images have `alt` text. |
| Responsiveness | Single-column layout at ≤ 768 px; 2-col stats at ≤ 480 px. |
| Branding | AWS colour palette: `#FF9900` (orange), `#232F3E` (dark navy). Primary accent: `#4f46e5`. |
| Portability | Standalone CSS file (`about.css`) — does not modify shared `styles.css`. |

## Data / API Surface

No backend API calls. The page is 100% static — all content is hardcoded HTML.

## Open Questions

- None — all content and design requirements confirmed.
