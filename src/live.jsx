import { useEffect, useMemo, useState } from "react";
import { content } from "./content";
import { fetchPieces } from "./api";

// ============================================================
//  LIVE CONTENT HOOK
//  Merges statically-built content (the content/ Markdown files)
//  with pieces published through the Writing Studio's Publish
//  button (Cloudflare D1 in production, local JSON in dev).
//  Static files win on a slug collision; everything is shown
//  together, newest first.
// ============================================================

let cachePromise = null;
function loadAll() {
  if (!cachePromise) {
    cachePromise = fetchPieces().catch(() => []);
  }
  return cachePromise;
}

const fmtDate = (iso) => {
  if (!iso) return "";
  const d = new Date(`${String(iso).slice(0, 10)}T00:00:00`);
  return Number.isNaN(d.getTime())
    ? iso
    : d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
};

const wordCount = (text) => (text || "").trim().split(/\s+/).filter(Boolean).length;
const readMins = (text) => Math.max(1, Math.round(wordCount(text) / 225));

export function normalizeRemote(row, kind) {
  if (!row) return null;
  const body = row.body || row.content || "";
  return {
    slug: row.slug || "",
    title: row.title || "Untitled",
    date: row.date || "",
    dateLabel: fmtDate(row.date || row.createdAt),
    tags: Array.isArray(row.tags) ? row.tags : [],
    excerpt: row.excerpt || "",
    style: row.style || "",
    status: "live",
    body,
    content: body,
    readMins: readMins(body),
    live: true,
    createdAt: row.createdAt || "",
    kind: kind || row.type,
  };
}

function mergeLists(staticItems, remoteRows) {
  const bySlug = {};
  for (const it of staticItems) bySlug[it.slug] = it;
  const merged = [...staticItems];
  for (const row of remoteRows || []) {
    if (bySlug[row.slug]) continue; // static file wins
    const norm = normalizeRemote(row);
    if (norm && norm.slug) merged.push(norm);
  }
  merged.sort((a, b) => {
    const ka = a.date || a.createdAt || "";
    const kb = b.date || b.createdAt || "";
    return kb.localeCompare(ka);
  });
  return merged;
}

export function useLiveContent() {
  const [state, setState] = useState({ ready: false, remote: [] });

  useEffect(() => {
    let on = true;
    loadAll().then((rows) => {
      if (on) setState({ ready: true, remote: rows || [] });
    });
    return () => {
      on = false;
    };
  }, []);

  return useMemo(() => {
    const essays = mergeLists(content.essays, state.remote.filter((r) => r.type === "essays"));
    const ideas = mergeLists(content.ideas, state.remote.filter((r) => r.type === "ideas"));
    const notes = mergeLists(content.notes, state.remote.filter((r) => r.type === "notes"));
    const projects = mergeLists(content.projects, state.remote.filter((r) => r.type === "projects"));
    return {
      ready: state.ready,
      essays,
      ideas,
      notes,
      projects,
      bySlugAll: {
        essays: Object.fromEntries(essays.map((e) => [e.slug, e])),
        ideas: Object.fromEntries(ideas.map((e) => [e.slug, e])),
        notes: Object.fromEntries(notes.map((e) => [e.slug, e])),
        projects: Object.fromEntries(projects.map((e) => [e.slug, e])),
      },
    };
  }, [state]);
}

export default useLiveContent;