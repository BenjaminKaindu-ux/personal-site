import { useMemo, useState } from "react";
import { writingStyles, styleById } from "../styles";
import Markdown from "../markdown";
import { profile } from "../config";
import Icon from "./icons";

const TYPES = [
  { id: "essays", label: "Essay", hint: "Longer thoughts, written slowly" },
  { id: "ideas", label: "Idea / Insight", hint: "A short reflection or open thread" },
  { id: "notes", label: "Learning note", hint: "Practical notes to self" },
  { id: "projects", label: "Project", hint: "A work in progress page" },
];

const today = () => new Date().toISOString().slice(0, 10);
const DRAFT_KEY = "ig.studio.draft";

const slugify = (s) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);

function buildMarkdown({ title, date, type, styleId, tags, excerpt, body }) {
  const meta = [
    "---",
    `title: ${(title || "").replace(/"/g, "'") || "Untitled"}`,
    `date: ${date || today()}`,
    styleId ? `style: ${styleId}` : null,
    tags && tags.length ? `tags: [${tags.map((t) => t.trim()).join(", ")}]` : null,
    excerpt ? `excerpt: ${(excerpt || "").replace(/\n/g, " ").replace(/"/g, "'")}` : null,
    "---",
    "",
  ].filter((l) => l !== null);

  const footer = buildFooter(type);
  return meta.join("\n") + (body || "").trim() + "\n" + footer;
}

function buildFooter(type) {
  if (type === "projects") return "";
  return (
    "\n\n---\n" +
    `_Looking for a response? Email ${profile.email.primary} — “Respond” links on the site carry this title._\n`
  );
}

export default function Studio() {
  const dev = import.meta.env.DEV;

  const [form, setForm] = useState({
    title: "",
    date: today(),
    type: "essays",
    styleId: "essay",
    tags: "",
    excerpt: "",
    body: "",
  });
  const [saved, setSaved] = useState(null); // file path (dev) or "draft"/"download" note
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [copied, setCopied] = useState(false);
  const [hasDraft, setHasDraft] = useState(() => {
    try {
      return Boolean(localStorage.getItem(DRAFT_KEY));
    } catch {
      return false;
    }
  });

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const preview = useMemo(() => {
    const body = form.body.trim() || "*(The page is dark until you write something.)*";
    const pre = form.title.trim()
      ? `# ${form.title}\n\n` + (form.excerpt ? `> ${form.excerpt.replace(/\n/g, " ")}\n\n` : "") + body
      : body;
    return pre;
  }, [form.body, form.title, form.excerpt]);

  const filename = useMemo(() => `${slugify(form.title) || "untitled"}.md`, [form.title]);
  const md = useMemo(() => buildMarkdown(form), [form]);
  const activeStyle = styleById(form.styleId);

  /* ----- actions ----- */

  async function saveToContent() {
    // Dev server only — writes the file into ./content on your machine.
    if (!form.title.trim()) {
      setError("Give it a title first — the filename comes from it.");
      return;
    }
    setBusy(true);
    setError("");
    setSaved(null);
    try {
      const res = await fetch("/__write", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: form.type, filename, content: md }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error || "Could not save");
      setSaved({ file: data.file });
      saveDraft();
    } catch {
      setError("Couldn’t reach the local writer. Use Download .md instead.");
    } finally {
      setBusy(false);
    }
  }

  function downloadMd() {
    if (!form.title.trim()) {
      setError("Give it a title first — the filename comes from it.");
      return;
    }
    setError("");
    const blob = new Blob([md], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
    setSaved({ note: `Downloaded ${filename}` });
  }

  function saveDraft() {
    try {
      localStorage.setItem(DRAFT_KEY, JSON.stringify({ ...form, savedAt: Date.now() }));
      setHasDraft(true);
      setSaved({ note: "Draft saved in this browser" });
    } catch {
      setError("Your browser blocked storage — use Download .md instead.");
    }
  }

  function loadDraft() {
    try {
      const raw = localStorage.getItem(DRAFT_KEY);
      if (!raw) return;
      const d = JSON.parse(raw);
      setForm({
        title: d.title || "",
        date: d.date || today(),
        type: d.type || "essays",
        styleId: d.styleId || "essay",
        tags: d.tags || "",
        excerpt: d.excerpt || "",
        body: d.body || "",
      });
      setHasDraft(true);
      setSaved({ note: "Draft loaded — keep writing" });
    } catch {
      setError("Couldn’t read the saved draft.");
    }
  }

  async function copyMd() {
    try {
      await navigator.clipboard.writeText(md);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      /* ignore */
    }
  }

  const primary = dev ? "Save to content/" : "Download .md";

  return (
    <section className="page studio-page">
      <div className="container studio-layout">
        {/* Editor pane */}
        <div className="studio-pane">
          <header className="studio-head">
            <p className="eyebrow">Write studio</p>
            <h1 className="page-title">New piece</h1>
            <p className="page-lede">
              Write freely — prose, notes, code.{" "}
              {dev ? (
                <>
                  <strong>On dev:</strong> “Save to content/” writes the file into <code>content/</code>{" "}
                  on your machine.
                </>
              ) : (
                <>
                  <strong>On the live site:</strong> the site stays 100% static — so save a draft to
                  this browser or download the finished <code>.md</code> to publish (drop it in the
                  GitHub repo and it redeploys).
                </>
              )}
            </p>
          </header>

          {hasDraft && !dev && (
            <div className="draft-banner">
              <Icon name="book" />
              <span>A draft is saved in this browser from last time.</span>
              <button type="button" className="btn btn-ghost btn-small" onClick={loadDraft}>
                Load draft
              </button>
            </div>
          )}

          <div className="studio-field">
            <label htmlFor="st-title">Title</label>
            <input id="st-title" value={form.title} onChange={set("title")} placeholder="A good title works like a hook" />
          </div>

          <div className="studio-row">
            <div className="studio-field">
              <label htmlFor="st-type">Type</label>
              <select id="st-type" value={form.type} onChange={set("type")}>
                {TYPES.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.label}
                  </option>
                ))}
              </select>
              <small className="field-hint">{TYPES.find((t) => t.id === form.type).hint}</small>
            </div>
            <div className="studio-field">
              <label htmlFor="st-date">Date</label>
              <input id="st-date" type="date" value={form.date} onChange={set("date")} />
            </div>
          </div>

          {form.type === "essays" && (
            <div className="studio-field">
              <label htmlFor="st-style">Style (affects the badge shown on the site)</label>
              <select id="st-style" value={form.styleId} onChange={set("styleId")}>
                {writingStyles.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.label}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className="style-guide-mini">
            <p className="style-guide-mini-title">
              <Icon name="sparkle" /> {activeStyle.label} — {activeStyle.tagline}
            </p>
            <p className="style-guide-mini-voice">{activeStyle.voice}</p>
            <ul className="style-guide-mini-structure">
              {activeStyle.structure.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>

          <div className="studio-field">
            <label htmlFor="st-tags">Tags (comma separated)</label>
            <input id="st-tags" value={form.tags} onChange={set("tags")} placeholder="ml, pytorch, python" />
          </div>

          <div className="studio-field">
            <label htmlFor="st-excerpt">Excerpt (shown on cards)</label>
            <textarea id="st-excerpt" rows={2} value={form.excerpt} onChange={set("excerpt")} placeholder="Two lines that make someone want to read on." />
          </div>

          <div className="studio-field">
            <label htmlFor="st-body">
              Body — write here
              <span className="md-help">
                markdown: ## headings, **bold**, *italic*, `code`, ``` blocks, - lists, 1. lists, &gt; quotes
              </span>
            </label>
            <textarea
              id="st-body"
              className="studio-body"
              rows={16}
              value={form.body}
              onChange={set("body")}
              placeholder={"Write your essay, idea, or note here…\n\n## A section heading\n\nSome paragraph with **bold** and *italics*.\n\n- a list item\n- another\n\n```python\nprint('hello')\n```"}
            />
          </div>

          <div className="studio-actions">
            <button type="button" className="btn btn-primary" onClick={dev ? saveToContent : downloadMd} disabled={busy}>
              <Icon name="pen" />
              {busy ? "Saving…" : primary}
            </button>
            <button type="button" className="btn btn-ghost" onClick={copyMd}>
              {copied ? "Copied ✓" : "Copy markdown"}
            </button>
            <button type="button" className="btn btn-ghost" onClick={saveDraft}>
              <Icon name="book" /> Save draft
            </button>
            {saved && (
              <span className="save-ok">
                ✓ {saved.note || `Saved to ${saved.file}`}
                {!dev && saved.file ? " — restart npm run dev to see it in the lists." : ""}
              </span>
            )}
            {error && <span className="save-err">{error}</span>}
          </div>

          {!dev && (
            <p className="publish-tip">
              <strong>To publish from here:</strong> download the <code>.md</code>, then in GitHub →
              your <code>content/{form.type}/</code> folder click <em>Add file → Create new file</em>,
              paste it, commit — Cloudflare redeploys automatically.
            </p>
          )}
        </div>

        {/* Preview pane */}
        <div className="studio-preview">
          <p className="studio-preview-label">Live preview</p>
          <div className="studio-preview-scroll">
            <article className="article preview-article">
              <Markdown text={preview} />
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}