// Inline SVG icon set — tiny, dependency-free, no API keys allowed.
// Add icons by dropping an entry (20x20 stroke icons use base, brand
// icons use fill). Keys referenced from src/config.js socials.

const base = {
  width: "1em",
  height: "1em",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": "true",
};

export default function Icon({ name, ...props }) {
  const Component = ICONS[name];
  return Component ? Component(props) : null;
}

const ICONS = {
  arrowRight: (p) => (
    <svg {...base} {...p}>
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  ),
  arrowLeft: (p) => (
    <svg {...base} {...p}>
      <path d="M19 12H5" />
      <path d="m12 19-7-7 7-7" />
    </svg>
  ),
  arrowDown: (p) => (
    <svg {...base} {...p}>
      <path d="M12 5v14" />
      <path d="m19 12-7 7-7-7" />
    </svg>
  ),
  search: (p) => (
    <svg {...base} {...p}>
      <circle cx="11" cy="11" r="7" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  ),
  mail: (p) => (
    <svg {...base} {...p}>
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  ),
  calendar: (p) => (
    <svg {...base} {...p}>
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M16 2v4M8 2v4M3 10h18" />
    </svg>
  ),
  clock: (p) => (
    <svg {...base} {...p}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  ),
  tag: (p) => (
    <svg {...base} {...p}>
      <path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z" />
      <circle cx="7.5" cy="7.5" r=".5" fill="currentColor" />
    </svg>
  ),
  github: (p) => (
    <svg {...base} {...p}>
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.4 5.4 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  ),
  linkedin: (p) => (
    <svg {...base} {...p}>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  ),
  huggingface: (p) => (
    <svg width="1em" height="1em" viewBox="0 0 24 24" fill="currentColor" {...p}>
      <path d="M12 2C5.4 2 1 6.3 1 12s4.4 10 11 10 11-4.3 11-10S18.6 2 12 2Zm-5.6 9.6h1.7c-.1.2-.1.4-.1.7 0 2 1.6 3.7 4 3.7s4-1.6 4-3.7c0-.2 0-.4-.1-.7h1.7c.1.2.1.4.1.7 0 1.9-1.3 3.6-5 3.6V21c-3.7 0-4-1.7-4-3.6V12c0-.2 0-.3.1-.4Zm0 0h-1.7 1.7Zm-2.1-1a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm12 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Z" />
      <circle cx="7.1" cy="8.1" r="1.1" fill="none" stroke="#fff" strokeWidth=".8" />
      <circle cx="16.9" cy="8.1" r="1.1" fill="none" stroke="#fff" strokeWidth=".8" />
    </svg>
  ),
  kaggle: (p) => (
    <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...p}>
      <circle cx="7.4" cy="10.6" r="3.1" />
      <circle cx="12.7" cy="9.2" r="3.6" />
      <circle cx="17.4" cy="7.8" r="3.6" opacity=".85" />
    </svg>
  ),
  x: (p) => (
    <svg width="1em" height="1em" viewBox="0 0 24 24" fill="currentColor" {...p}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117l11.966 15.644Z" />
    </svg>
  ),
  menu: (p) => (
    <svg {...base} {...p}>
      <path d="M4 7h16" />
      <path d="M4 12h16" />
      <path d="M4 17h16" />
    </svg>
  ),
  close: (p) => (
    <svg {...base} {...p}>
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  ),
  external: (p) => (
    <svg {...base} {...p}>
      <path d="M15 3h6v6" />
      <path d="M10 14 21 3" />
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    </svg>
  ),
  sparkle: (p) => (
    <svg {...base} {...p}>
      <path d="M12 3v2m0 14v2M3 12h2m14 0h2M5.6 5.6l1.4 1.4m10 10 1.4 1.4M18.4 5.6 17 7m-10 10-1.4 1.4" />
      <circle cx="12" cy="12" r="3" fill="currentColor" stroke="none" />
    </svg>
  ),
  pen: (p) => (
    <svg {...base} {...p}>
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
    </svg>
  ),
  reply: (p) => (
    <svg {...base} {...p}>
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  ),
  leaf: (p) => (
    <svg {...base} {...p}>
      <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
      <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
    </svg>
  ),
  book: (p) => (
    <svg {...base} {...p}>
      <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
    </svg>
  ),
};