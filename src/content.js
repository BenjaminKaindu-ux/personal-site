// ============================================================
//  CONTENT LOADER
//  Pulls every Markdown file from /content (essays, ideas,
//  notes, projects) at build time, parses a small frontmatter
//  header, and hands the rest of the app clean objects.
//
//  Frontmatter format (first block of an .md file):
//    ---
//    title: My essay title
//    date: 2026-10-18
//    tags: [ml, pytorch]
//    excerpt: One or two lines for the card.
//    style: essay            (optional — writing style id)
//    status: sample          (optional — shows a "Sample" badge)
//    links:                  (optional — for projects)
//      - Demo: https://...
//    ---
// ============================================================

const rawFiles = import.meta.glob("/content/**/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
});

function parseFrontmatter(text) {
  const meta = {};
  let body = text;
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(text);
  if (match) {
    body = text.slice(match[0].length);
    const raw = match[1];
    // parse simple `key: value` / `key: [a, b]` lines
    const keyRe = /^([A-Za-z0-9_-]+):(.*)$/;
    let currentKey = null;
    let list = null;
    const lists = {};
    for (const line of raw.split(/\r?\n/)) {
      const m = keyRe.exec(line.trim());
      if (m) {
        currentKey = m[1];
        let val = m[2].trim();
        if (/^\[.*\]$/.test(val)) {
          meta[currentKey] = val
            .slice(1, -1)
            .split(",")
            .map((s) => s.trim().replace(/^["']|["']$/g, ""))
            .filter(Boolean);
        } else if (val !== "") {
          meta[currentKey] = val.replace(/^["']|["']$/g, "");
        } else {
          list = [];
          lists[currentKey] = list;
        }
      } else if (currentKey && /^\s*-\s+/.test(line)) {
        const item = line.replace(/^\s*-\s+/, "").trim();
        (list || lists[currentKey] || (lists[currentKey] = [])).push(item);
      }
    }
    Object.assign(meta, lists);
  }
  return { meta, body: body.replace(/^\s*/, "").trim() };
}

function slugify(str) {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

const fmtDate = (iso) => {
  if (!iso) return "";
  const d = new Date(`${iso}T00:00:00`);
  return Number.isNaN(d.getTime())
    ? iso
    : d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
};

const wordCount = (text) => (text || "").trim().split(/\s+/).filter(Boolean).length;
const readingMinutes = (text) => Math.max(1, Math.round(wordCount(text) / 225));

function load() {
  const out = { essays: [], ideas: [], notes: [], projects: [] };
  for (const [, raw] of Object.entries(rawFiles)) {
    const { meta, body } = parseFrontmatter(raw);
    const type = detectType(meta, body, raw);
    if (!type) continue;
    const title = meta.title || body.split(/\r?\n/)[0].replace(/^#+\s*/, "") || "Untitled";
    const item = {
      slug: meta.slug || slugify(title),
      title,
      date: meta.date || "",
      dateLabel: fmtDate(meta.date),
      tags: Array.isArray(meta.tags) ? meta.tags : [],
      excerpt: meta.excerpt || firstSentences(body, 2),
      style: meta.style || "",
      status: meta.status || "",
      links: Array.isArray(meta.links) ? meta.links.map(linkify).filter(Boolean) : [],
      body,
      readMins: readingMinutes(body),
      content: body,
    };
    out[type].push(item);
  }
  for (const key of Object.keys(out)) {
    out[key].sort((a, b) => (b.date || "").localeCompare(a.date || ""));
  }
  return out;
}

function linkify(line) {
  const m = /^(.*?):\s*(https?:\/\/.+)$/.exec(line);
  return m ? { label: m[1], url: m[2] } : line.startsWith("http") ? { label: "Link", url: line } : null;
}

function detectType(meta, body, rawPath) {
  if (meta.type) return ["essays", "ideas", "notes", "projects"].find((t) => t === meta.type);
  if (rawPath.includes("/essays/")) return "essays";
  if (rawPath.includes("/ideas/")) return "ideas";
  if (rawPath.includes("/notes/")) return "notes";
  if (rawPath.includes("/projects/")) return "projects";
  return null;
}

function firstSentences(md, count) {
  return md
    .replace(/^#.*$/gm, "")
    .replace(/`{3}[\s\S]*?`{3}/g, "")
    .replace(/[>*#|_-]/g, " ")
    .split(/\s+|[.!?](?=\s|$)/)
    .join(" ")
    .trim()
    .split(/(?<=\.)\s/)
    .slice(0, count)
    .join(" ")
    .slice(0, 240);
}

export const content = load();

export const bySlug = {
  essays: bySlugFor(content.essays),
  ideas: bySlugFor(content.ideas),
  notes: bySlugFor(content.notes),
  projects: bySlugFor(content.projects),
};

function bySlugFor(list) {
  const map = {};
  for (const item of list) map[item.slug] = item;
  return map;
}

export function searchItems(items, query) {
  const q = (query || "").toLowerCase().trim();
  if (!q) return items;
  return items.filter((it) => {
    const hay = [it.title, it.excerpt, it.tags.join(" "), it.content].join(" ").toLowerCase();
    return q.split(/\s+/).every((w) => hay.includes(w));
  });
}

export function tagCounts(items) {
  const counts = {};
  for (const it of items) for (const t of it.tags) counts[t] = (counts[t] || 0) + 1;
  return counts;
}

export const SAMPLE_NOTE =
  "Content in this file is sample/demo material you can delete whenever you like.";