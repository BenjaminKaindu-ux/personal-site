# 🌱 Benjamin Kaindu — Personal "Idea Garden"

A polished, responsive, **fully static** personal site for essays, ideas, projects, and learning
notes — built with **React + Vite**, hosted anywhere including **Cloudflare Pages**.

There is **no backend, no database, no login, no API keys, and no server-side functions**. The
whole site is built from plain **Markdown files** in the `content/` folder.

---

## 🚀 Quick start

```bash
# 1. Install dependencies (first time only)
npm install

# 2. Start the dev server (includes the built-in Writing Studio)
npm run dev
# → http://localhost:5173

# 3. Build the static site — output goes to ./dist
npm run build

# 4. Preview the production build
npm run preview
```

---

## ✍️ The Writing Studio — where you actually write, *and publish*

Click **Write** in the navigation (or go to `#/studio`) — it works locally **and on the live site**.

You get a proper editor with **live Markdown preview**, the **8 writing styles guide**, and a
**Publish to site** button:

- **Publish to site** — saves instantly for every visitor, backed by **Cloudflare D1**, a free
  edge database (no login, no third-party services, no API keys). Published pieces appear in the
  Essays / Ideas / Projects / Notes lists and on Home with a **● Live** badge.
- **Save to content/** (dev only) — writes the file into `content/<type>/<filename>.md`
- **Save draft** — keeps your work safe in your browser
- **Download .md** / **Copy markdown** — the fallback for committing content into the repo

> The site stays a **static Pages project**. The tiny `functions/api/pieces.js` is a single
> Cloudflare Pages Function served by Cloudflare on the same Git deploy — no `wrangler deploy`
> on your side, works with the ordinary Pages → Connect to Git flow.

### If you'd rather just write Markdown by hand

Every piece of content is a normal file:

```
content/
├── essays/    Longer essays  (article pages with dates, tags, reading time)
├── ideas/     Short thoughts & open threads (cards with "Jump in" links)
├── notes/     Learning notes about AI/ML/Python etc.
└── projects/  Projects (cards + detail pages with status and links)
```

Each file starts with a small frontmatter block:

```md
---
title: My essay title
date: 2026-10-18
tags: [ml, pytorch]          # single or multiple topics
style: essay                 # optional: essay | insight | note | story | argument | guide | listicle | letter
excerpt: One or two lines for the card.
status: sample               # optional: shows a "Sample" badge you can remove
links:                       # optional (projects): label + URL
  - Demo: https://example.com
---

Body text here. **Markdown is supported:**
## headings, *italic*, `code`, ```python blocks```, - lists, 1. lists, > quotes, [links](url)
```

**Markdown syntax supported:** headings (H1–H4), paragraphs, bold, italic, inline code,
fenced code blocks (with language label), bullet & numbered lists, blockquotes, links, and
horizontal rules. Raw HTML is **never** rendered (safe by design).

### ✂️ Removing the sample content

The demo files are deliberately tiny and clearly marked with a **Sample** badge:

```bash
rm content/essays/sample-learning-in-public.md
rm content/ideas/sample-learning-by-building.md
rm content/notes/sample-pytorch-tensor-shapes.md
rm content/projects/sample-data-explorer.md
```

`content/projects/hermes.md` is real (not sample) — an early-stage idea of yours. Keep it,
edit it, or remove it; everything is your call.

---

## 🧭 Pages & features

| Route | Page |
| --- | --- |
| `#/` | Home — intro, selected essays/ideas/projects/notes, CTA |
| `#/essays` | Essays — search + topic filters + respond links |
| `#/essays/<slug>` | Individual essay (dates, tags, reading time, respond) |
| `#/ideas` | Ideas & insights — short open threads |
| `#/projects` | Project cards with honest statuses |
| `#/projects/<slug>` | Project detail page (purpose, status, links) |
| `#/notes` | Learning notes — search + topic filters |
| `#/notes/<slug>` | Individual note |
| `#/about` | About — real facts only, everything editable |
| `#/contact` | Email contact (subject auto-filled from respond links) + socials |
| `#/studio` | **Writing Studio** (dev server only) |

**Visitor responses:** every essay, project, and idea ends with a **Respond** link that opens
your email with the title pre-filled as the subject. No pretend comment form — just email.

Search, topic filters, reading time, dates, and helpful empty states are built in.

---

## ✏️ Making it yours

One file controls everything personal:

```
src/config.js
```

| Key | What it controls |
| --- | --- |
| `profile.name` / `firstName` | Your name everywhere |
| `profile.role`, `intro`, `summary` | Hero copy |
| `profile.location` | Shown wherever "where I am" appears |
| `profile.email.primary` / `.secondary` | All Respond & Contact links point here |
| `learning.courses` / `currently` / `exploring` | About page facts (edit to match reality) |
| `socials[]` | GitHub, LinkedIn, Hugging Face, Kaggle links |
| `heroImage` | Which local nature photo fronts the home page |

The About page contains **only facts you've shared** — course completions, current learning,
interests. It makes no claims beyond that. Adjust it whenever you like.

---

## ☁️ Deploying to Cloudflare Pages

1. Push this repository to GitHub (e.g. `BenjaminKaindu-ux/personal-site`).
2. In the Cloudflare dashboard → **Workers & Pages → Create → Pages → Connect to Git**.
3. Select the repo, then set:

   - **Project name:** anything (e.g. `benjamin-kaindu`)
   - **Framework preset:** *Vite*
   - **Root directory:** *(leave blank — the project is at the repo root)*
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`

4. **Save & Deploy.** That's it — no `wrangler deploy`, no Worker project. Cloudflare serves the
   static files straight from `dist/` on every push, and automatically wires up the one small
   Page Function in `functions/` (just the publishing API). Optional: add the D1 binding for
   live publishing (steps below).

> ℹ️ This is a **static Pages site only** — zero server-side code ships to production. The
> Writing Studio's save feature exists solely in local dev (`npm run dev`); the deployed site
> contains no mechanism (and no API keys) to write files.

### 🗄 Enable live publishing (Cloudflare D1) — optional but recommended

To make **Publish to site** work on the deployed site (instant writing for everyone), add a
free Cloudflare D1 database and bind it:

1. **Create the database:** Cloudflare dashboard → **Workers & Pages → D1 → Create database**
   → name it `personal-site-db` → Create.
2. **Bind it to the Pages project:** open your Pages project → **Settings → Bindings** →
   **Add → D1 database** → choose `personal-site-db` → set the **binding name to exactly `DB`**
   (the function reads `context.env.DB`) → **Save**.
3. That's it. The table is created automatically on first use (schema reference:
   `d1/schema.sql`). Redeploy once after adding the binding.

In local dev the same `/api/pieces` API is served by the dev server (stored in a gitignored
`content/live-pieces.json`), so the studio behaves identically before you've set up D1.

---

## 🧰 Useful scripts

| Command | Does |
| --- | --- |
| `npm run dev` | Dev server + Writing Studio |
| `npm run build` | Production build into `dist/` |
| `npm run preview` | Serve the `dist/` build locally |
| `npm run lint` | Lint source (oxlint) |
| `npm run studio` | Same as `npm run dev` (alias convenience) |

> Note: `npm run build` is the production build command and the output is always `dist/`.

---

## 🗂 Project structure

```
├── content/                  ← ALL your writing lives here (Markdown)
│   ├── essays/
│   ├── ideas/
│   ├── notes/
│   └── projects/
├── public/
│   ├── favicon.svg
│   └── images/               ← local nature photos (bundled into dist/)
└── src/
    ├── config.js             ← your name, emails, socials (edit me)
    ├── content.js            ← loads + parses all Markdown at build
    ├── markdown.jsx          ← safe Markdown renderer (no raw HTML)
    ├── router.js             ← tiny hash router (static-host friendly)
    ├── styles.js             ← the 8 writing styles guide
    ├── components/
    │   ├── Studio.jsx        ← the Writing Studio (dev only)
    │   ├── Home/ Essays/ Ideas/ Projects/ Notes/ About/ Contact …
    │   └── ...
    ├── index.css             ← design tokens & base (cream editorial theme)
    └── App.css               ← layout & components
```

---

Made with React, Vite, and a keyboard — read something that struck a nerve? The respond links
know the way to the inbox.