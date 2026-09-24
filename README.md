# Bilal Ihsan — Portfolio Website

A production-ready personal portfolio built with plain HTML5, CSS3 and vanilla
JavaScript — no frameworks, no build tools, no backend.

## Structure

```
bilal-ihsan-portfolio/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── script.js
├── assets/
│   ├── images/
│   │   ├── profile.jpg          ← your photo (already added)
│   │   └── projects/            ← optional real project photos
│   └── Bilal-Ihsan-CV.pdf       ← ADD THIS FILE (see below)
└── README.md
```

## Running it

No build step needed. Just open `index.html` in a browser, or serve the
folder with any static server, e.g.:

```
npx serve .
```

## Things to finish on your end

1. **CV file** — the "Download CV" button in the hero points to
   `assets/Bilal-Ihsan-CV.pdf`. That file isn't included (none was
   provided), so add your actual CV at that exact path and the button
   will work immediately.

2. **Project images** — the three featured projects (Woodelle, Falah
   Technologies, Velora) currently use elegant colour-treated placeholders
   instead of photos, since no project images were supplied. If you have
   real project screenshots, drop them into `assets/images/projects/` and
   swap the `.project-media` div in each card for an `<img>` tag.

3. **Contact form** — the form validates input and shows a success
   message, but this is a frontend-only project with no backend, so no
   email is actually sent yet. To make it fully functional, wire it up to
   a service such as Formspree, EmailJS, or your own backend endpoint,
   and update the `fetch`/submit logic in `js/script.js`.

## Content source

All personal, professional and educational content is based strictly on
the CV/brief provided — no companies, clients, statistics or
achievements were invented. Where information wasn't available (e.g. the
university name for the BBA), it was intentionally left out rather than
fabricated.

## Notes on design

- Dark, premium theme with a gold accent (commercial / trading
  credibility) and a teal accent (digital / AI work).
- Typefaces: Sora (headings) + Inter (body).
- All animations respect `prefers-reduced-motion`.
- Fully responsive from 1920px down to 375px, no horizontal scroll.
