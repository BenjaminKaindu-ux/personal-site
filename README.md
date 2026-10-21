# 🌲 Personal Site — React + Vite

A polished, responsive personal website for sharing **projects**, **ideas**, and **thoughts** — with a contact section that invites visitors to email you directly. Fully **static**: no backend, no API keys, no server. The nature photos ship with the site, so it works anywhere you put it.

![Stack](https://img.shields.io/badge/React-19-blue) ![Vite](https://img.shields.io/badge/Vite-8-purple) ![Build](https://img.shields.io/badge/build-dist-green)

---

## 🚀 Quick start

```bash
# 1. Install dependencies (first time only)
npm install

# 2. Run the dev server (hot reload at http://localhost:5173)
npm run dev

# 3. Build the production site — output goes to ./dist
npm run build

# 4. Preview the production build locally
npm run preview
```

> Build output is written to **`dist/`** by default (Vite convention). Deploy that folder to any static host: GitHub Pages, Netlify, Cloudflare Pages, Vercel, an S3 bucket, or `scp` it to any web server.

---

## ✏️ Make it yours

Everything you’re likely to edit lives in **one file**:

```
src/config.js
```

| Key | What it controls |
| --- | --- |
| `profile.name` | Your name (nav, hero, footer, mailto greeting) |
| `profile.role` / `headline` / `tagline` | Hero copy |
| `profile.bio` | About-section paragraphs (one array entry = one paragraph) |
| `profile.focus` | The "Currently" chips in About |
| `profile.email` | **The address all Contact links point to** |
| `profile.resumeUrl` | Optional résumé link (leave `""` to hide the button) |
| `projects[]` | Project cards — title, description, tags, link, emoji icon |
| `ideas[]` | Idea cards + each gets a "Discuss this idea" mailto link |
| `socials[]` | Social buttons (icons: `github`, `x`, `linkedin`, `mail`, `rss`) |
| `backgroundImage` | Which nature photo is the site background |

### ✍️ Writing — short essays, insights & anything you want to share

All your writing lives in **`src/writing.js`** — add a post and it shows up, rebuilt into a
beautiful full-page article. No backend, no forms, no API keys: the site is static, you are the
editor.

```js
post = {
  title: "Why I keep a paper map",
  date: "2026-10-18",          // ISO date, shown nicely on the site
  style: "essay",              // one of the 8 styles below
  excerpt: "One or two lines shown on the card.",
  blocks: [ ... ]              // plain-text blocks — see cheat-sheet
}
```

**Blocks cheat-sheet** (the `blocks` array):

| Write | Gives you |
| --- | --- |
| `"Some text"` | a paragraph (first one gets a drop cap) |
| `["h", "Sub heading"]` | a sub-heading |
| `["q", "quote"]` or `["q", "quote", "— who"]` | a pull-quote |
| `["list", ["a", "b"]]` | bullet list |
| `["ol", ["1", "2"]]` | numbered list |
| `["steps", ["Do this", "Then that"]]` | big numbered steps (how-tos) |
| `["center", "One-line takeaway"]` | centered call-out line |
| `["salutation", "Dear reader,"]` | letter greeting |
| `["sign", "— Alex"]` | letter sign-off |
| `["st", "A bold statement"]` | manifesto-style statement |
| `["hr"]` | a divider |

You can also use `**bold**` and `*italic*` inside any text.

### ✒️ The writing styles field guide

The **Writing** section includes a built-in guide to the 8 most common writing styles. Tap any
tile on the site to see its voice, shape, and a ready-to-fill template you can copy straight
into `src/writing.js`:

1. **Reflective Essay** — a careful, personal walk through one question
2. **Insight / Spark** — one sharp observation, delivered clean
3. **Journal / Diary Note** — a dated, honest note from where you are
4. **Narrative / Storytelling** — scene-first, put the reader there
5. **Argument / Persuasion** — take a side, build the case, stay fair
6. **How-to / Guide** — teach a process someone can follow
7. **Listicle / Quick List** — snappy and scannable
8. **Letter / Correspondence** — write to one person, let everyone read it

The seeded posts in `src/writing.js` are examples demonstrating every block type and several
styles — replace them with your own.

### 📷 Nature background & images

Photos live in `public/images/` and are included in every build:

| File | Photo |
| --- | --- |
| `nature-mountains.jpg` | Foggy mountain ridge at sunrise (default background) |
| `nature-main.jpg` | Yosemite valley river at dusk |
| `nature-forest.jpg` | Sunlit green forest |
| `nature-field.jpg` | Golden field at sunset |

To use a different one (or your own photo), change one line in `src/config.js`:

```js
export const backgroundImage = "/images/nature-forest.jpg";
```

Drop any new image into `public/images/` and reference it the same way — it will be copied into `dist/` automatically.

All photos are from **Unsplash** and free to use (no attribution required). See `profile.photoCredit` in the footer config if you’d like to adjust the credit.

---

## 🧱 What’s inside

```
personal-site/
├── index.html            # HTML shell, fonts, meta
├── package.json
├── vite.config.js
├── public/
│   ├── favicon.svg      # Site icon (custom leaf mark)
│   └── images/          # Nature photos used site-wide
└── src/
    ├── main.jsx
    ├── App.jsx          # Layout shell + nature background
    ├── config.js        # ⭐ Your profile, projects, ideas & socials
    ├── writing.js       # ⭐ Your essays, insights & the styles guide
    ├── index.css        # Design tokens, base styles, animations
    ├── App.css          # Component styles (fully responsive)
    └── components/
        ├── Navbar.jsx   # Fixed nav + mobile hamburger menu
        ├── Hero.jsx     # Full-screen intro over the nature bg
        ├── About.jsx    # Bio + "Currently" focus chips
        ├── Writing.jsx  # Essays/insights + writing-styles field guide
        ├── Projects.jsx # Project cards grid
        ├── Ideas.jsx    # Idea cards with mailto "Discuss" links
        ├── Contact.jsx  # Email CTA + social buttons
        ├── Footer.jsx
        ├── Reveal.jsx   # Scroll-into-view fade helper (no libraries)
        └── icons.jsx    # Tiny inline SVG icons (dependency-free)
```

## ✨ Highlights

- **No build complexity** — plain React + Vite, zero extra runtime dependencies.
- **Contact without a backend** — the Contact section and every "Discuss this idea" link are plain `mailto:` links; no forms, no servers, no API keys.
- **Fully responsive** — desktop grid, mobile hamburger nav, fluid typography.
- **Accessible & respectful** — semantic markup, focus states, `prefers-reduced-motion` support.
- **Static by design** — fonts fall back gracefully if offline; images are local.

## 🛠 Useful scripts

| Command | Does |
| --- | --- |
| `npm run dev` | Start dev server with hot reload |
| `npm run build` | Build static site into `dist/` |
| `npm run preview` | Serve the `dist/` build locally |
| `npm run lint` | Lint the source (oxlint) |

## 📝 Deployment example (Netlify / Vercel / GitHub Pages)

- **Netlify / Vercel / Cloudflare Pages**: connect the repo — build command `npm run build`, publish directory **`dist`**.
- **GitHub Pages** (`docs/` or Actions): build locally with `npm run build` and push the contents of `dist/` to your Pages branch, running in `/docs` mode if you need a sub-path.
- **Any host**: `dist/` is a plain folder of static files — drop it on any web server.

---

Made with 🥾 and a view of the mountains. If this inspired an idea, the contact section knows how to find me — that’s the whole point.