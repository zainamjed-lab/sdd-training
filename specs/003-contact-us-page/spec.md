# Feature Spec: Contact Us Page

**Feature ID**: 003
**Branch**: 003-contact-us-page
**Status**: Approved

---

## Objective

Create a public-facing Contact Us page that allows prospective and existing clients to reach out
to the MSP/AWS Premier Tier Partner team. The page provides multiple contact channels, a
structured inquiry form, office details, and a "what happens next" trust section — all without
requiring authentication.

## Success Criteria

- [ ] Page is publicly accessible at `/contact.html` — no login required.
- [ ] Contact form collects: Full Name, Work Email, Company, Phone (optional), Subject (dropdown), Message.
- [ ] Client-side validation highlights empty required fields and invalid email before submission.
- [ ] On successful form submission, a success confirmation message replaces the form.
- [ ] Contact details panel shows email, phone, and address.
- [ ] Office hours are clearly displayed.
- [ ] "What happens next" section outlines the 3-step response process.
- [ ] Navigation bar matches the About Us page (dark AWS-branded nav with logo).
- [ ] "Contact Us" link is added to the About Us page nav and the dashboard topbar.
- [ ] Page is fully responsive down to 375 px.

## User Stories

| # | As a… | I want to… | So that… |
|---|-------|-----------|---------|
| 1 | Prospective client | Submit an inquiry with my details | The team can reach out to me |
| 2 | Prospective client | See contact details and office hours | I know how and when to reach the team directly |
| 3 | Prospective client | Know what to expect after I submit | I'm confident my message won't go into a void |
| 4 | Logged-in user | Navigate to Contact Us from the dashboard | I can raise a support or sales inquiry |
| 5 | Visitor on mobile | Fill the form comfortably on a phone | The layout works on small screens |

## Functional Requirements

### Must Have
- FR-01: Static HTML page at `/contact.html` served by Express static middleware.
- FR-02: Sticky nav bar — logo, links to Home (`/`), About (`/about.html`), sign-in link.
- FR-03: Hero section — headline, subtext, two stat chips (response time, availability).
- FR-04: Two-column layout — contact form (left) + contact details panel (right).
- FR-05: Form fields: Full Name (required), Work Email (required), Company (required), Phone (optional), Subject dropdown (required), Message textarea (required).
- FR-06: Subject dropdown options: General Inquiry, Cloud Migration, Managed Services, AWS Partnership, Support, Other.
- FR-07: Client-side validation — required fields, email format, message minimum 10 chars.
- FR-08: On valid submit — hide form, show success card with confirmation message.
- FR-09: Contact details panel — email address, phone number, physical address, office hours.
- FR-10: "What Happens Next" — 3 numbered steps: Receive & Review, Assign Expert, Schedule Call.
- FR-11: Footer matching About Us page style.
- FR-12: "Contact Us" nav link added to `about.html` nav and `dashboard.html` topbar.

### Should Have
- FR-13: Character counter on the message textarea (e.g. "120 / 1000").
- FR-14: Phone field accepts international format (no strict validation — optional field).
- FR-15: Smooth scroll to form when hero CTA is clicked.

### Won't Have (this iteration)
- Backend form submission (no POST endpoint — client-side only with simulated success)
- CAPTCHA / spam protection
- File attachment upload
- Live chat widget

## Non-Functional Requirements

| Category | Requirement |
|----------|-------------|
| Performance | Page renders without JavaScript — form validation and submit handler in vanilla JS only. |
| Accessibility | All form inputs have associated `<label>`. Error messages use `aria-live="assertive"`. Fieldset grouping for the form. |
| Responsiveness | Two-column layout collapses to single column at ≤ 768 px. |
| Branding | Consistent with About Us: `#232F3E` nav, `#FF9900` accents, `#4f46e5` primary. |
| Portability | Standalone `contact.css` — does not modify `styles.css` or `about.css`. |

## Data / API Surface

No backend API calls. Form submission is handled entirely client-side. On valid submit,
the form is hidden and a success message is displayed. A future iteration may POST to
`/api/contact` when a backend handler is added.

## Open Questions

- None — all requirements confirmed.
