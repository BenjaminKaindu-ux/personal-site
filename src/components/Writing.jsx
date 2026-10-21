import { useEffect, useRef, useState } from "react";
import { styles, postCards, styleById } from "../writing";
import { profile } from "../config";
import Icon from "./icons";
import Reveal from "./Reveal";

/* ---------------- tiny inline formatter (supports **bold** & *italic*) ---------------- */
function renderInline(text) {
  const parts = [];
  const re = /\*\*[^*]+\*\*|\*[^*]+(?:\*|$)/g;
  let last = 0;
  let m;
  let key = 0;
  while ((m = re.exec(text))) {
    if (m.index > last) parts.push(text.slice(last, m.index));
    const token = m[0];
    const isBold = token.startsWith("**");
    const inner = token.replace(/^\*+|\*+$/g, "");
    parts.push(
      <strong key={key++} className={isBold ? "em-strong" : "em-italic"}>
        {inner}
      </strong>
    );
    last = m.index + token.length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return parts.length === 1 && typeof parts[0] === "string" ? parts[0] : parts;
}

/* ---------------- block renderer: each writing style gets its own shape ---------------- */
function Block({ block, dropcap }) {
  if (typeof block === "string") {
    return <p className={dropcap ? "dropcap" : ""}>{renderInline(block)}</p>;
  }
  const [type, payload, extra] = block;

  switch (type) {
    case "h":
      return <h3 className="post-h3">{payload}</h3>;
    case "q":
      return (
        <blockquote className="pull-quote">
          <p>{renderInline(payload)}</p>
          {extra && <cite>{renderInline(extra)}</cite>}
        </blockquote>
      );
    case "list":
      return (
        <ul className="post-ul">
          {payload.map((item, i) => (
            <li key={i}>{renderInline(item)}</li>
          ))}
        </ul>
      );
    case "ol":
      return (
        <ol className="post-ol">
          {payload.map((item, i) => (
            <li key={i}>{renderInline(item)}</li>
          ))}
        </ol>
      );
    case "steps":
      return (
        <ol className="steps">
          {payload.map((item, i) => (
            <li key={i}>
              <span className="step-num">{i + 1}</span>
              <span>{renderInline(item)}</span>
            </li>
          ))}
        </ol>
      );
    case "center":
      return <p className="callout-center">{renderInline(payload)}</p>;
    case "salutation":
      return <p className="salutation">{payload}</p>;
    case "sign":
      return <p className="signoff">{payload}</p>;
    case "st":
      return <p className="statement">{payload}</p>;
    case "hr":
      return <hr className="post-hr" />;
    default:
      return <p>{renderInline(String(payload ?? ""))}</p>;
  }
}

function renderBlocks(blocks) {
  let firstShown = false;
  return blocks.map((block, i) => {
    const isPar = typeof block === "string";
    const dropcap = isPar && !firstShown && blocks.length > 2;
    if (isPar) firstShown = true;
    return <Block key={i} block={block} dropcap={dropcap} />;
  });
}

/* ---------------- full-screen post reader ---------------- */
function PostReader({ post, onClose }) {
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div className="overlay" role="dialog" aria-modal="true" aria-label={post.title} onClick={onClose}>
      <article
        className="reader"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="overlay-close" onClick={onClose} aria-label="Close article">
          <Icon name="close" />
        </button>

        <header className="reader-head">
          <div className="reader-meta">
            <span className={`pill pill-style`}>{post.styleMeta.icon} {post.styleMeta.label}</span>
            <span className="reader-date">{post.dateLabel}</span>
            <span className="reader-date">·</span>
            <span className="reader-date">{post.readMins} min read</span>
          </div>
          <h2 className="reader-title">{post.title}</h2>
        </header>

        <div className="post-body">{renderBlocks(post.blocks)}</div>

        <footer className="reader-foot">
          <p className="reader-invite">Enjoyed it? Disagree? Found a better answer?</p>
          <a
            className="btn btn-ghost"
            href={`mailto:${profile.email}?subject=${encodeURIComponent(`Re: "${post.title}"`)}`}
          >
            <Icon name="mail" />
            Reply to this post
          </a>
          <button className="btn btn-ghost" onClick={onClose}>
            ← Back to writing
          </button>
        </footer>
      </article>
    </div>
  );
}

/* ---------------- style field-guide overlay ---------------- */
function StyleGuide({ style, onClose }) {
  const [copied, setCopied] = useState(false);
  const timer = useRef(null);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      clearTimeout(timer.current);
    };
  }, [onClose]);

  const copy = async () => {
    try {
      if (navigator.clipboard?.writeText) await navigator.clipboard.writeText(style.template);
      else {
        const ta = document.createElement("textarea");
        ta.value = style.template;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
      }
      setCopied(true);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 1600);
    } catch {
      /* clipboard unavailable — the template is still visible to copy by hand */
    }
  };

  return (
    <div className="overlay" role="dialog" aria-modal="true" aria-label={style.label} onClick={onClose}>
      <div className="style-guide" onClick={(e) => e.stopPropagation()}>
        <button className="overlay-close" onClick={onClose} aria-label="Close style guide">
          <Icon name="close" />
        </button>

        <header className="style-head">
          <span className="style-icon">{style.icon}</span>
          <div>
            <span className="eyebrow">Writing style</span>
            <h2 className="reader-title">{style.label}</h2>
          </div>
        </header>
        <p className="style-tagline">{style.tagline}</p>

        <div className="style-section">
          <h3>When to use it</h3>
          <p>{style.when}</p>
        </div>

        <div className="style-section">
          <h3>The voice</h3>
          <p>{style.voice}</p>
        </div>

        <div className="style-section">
          <h3>Shape of the piece</h3>
          <ol className="style-structure">
            {style.structure.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ol>
        </div>

        <div className="style-section">
          <h3>Template</h3>
          <p className="style-hint">
            Copy this outline into a post’s <code>blocks</code> in <code>src/writing.js</code> and fill
            in the blanks. Every style on this site is written in plain text — no backend, no forms.
          </p>
          <pre className="template-pre">{style.template}</pre>
          <button className="btn btn-primary btn-copy" onClick={copy}>
            {copied ? "Copied ✓" : "Copy template"}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ---------------- the Writing section ---------------- */
export default function Writing() {
  const [activePost, setActivePost] = useState(null);
  const [activeStyle, setActiveStyle] = useState(null);
  const [filter, setFilter] = useState("all");

  const shown = filter === "all" ? postCards : postCards.filter((p) => p.style === filter);
  const presentStyles = [...new Set(postCards.map((p) => p.style))];

  return (
    <section id="writing" className="section">
      <div className="container">
        <div className="section-head">
          <Reveal>
            <span className="eyebrow">Writing</span>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="section-title">Essays, insights & everything between</h2>
          </Reveal>
          <Reveal delay={140}>
            <p className="section-sub">
              A front porch for full sentences. New writing appears here — short essays, sparks,
              letters and trail notes — each one rendered the way it was written.
            </p>
          </Reveal>
        </div>

        {/* Style field guide */}
        <Reveal>
          <div className="style-strip-head">
            <p className="style-strip-label">
              <Icon name="sparkle" /> Write in any style
            </p>
            <p className="style-strip-hint">Tap a style for its voice, shape & a ready-to-fill template</p>
          </div>
          <div className="style-strip" role="list" aria-label="Writing styles">
            {styles.map((s) => (
              <button
                key={s.id}
                type="button"
                className="style-tile"
                onClick={() => setActiveStyle(s)}
                role="listitem"
              >
                <span className="style-tile-icon" aria-hidden="true">
                  {s.icon}
                </span>
                {s.label}
              </button>
            ))}
          </div>
        </Reveal>

        {/* Filter chips */}
        {presentStyles.length > 0 && (
          <Reveal>
            <div className="filter-bar" role="group" aria-label="Filter writing by style">
              <button
                type="button"
                className={`filter-chip ${filter === "all" ? "active" : ""}`}
                onClick={() => setFilter("all")}
              >
                All
              </button>
              {presentStyles.map((id) => (
                <button
                  key={id}
                  type="button"
                  className={`filter-chip ${filter === id ? "active" : ""}`}
                  onClick={() => setFilter(id)}
                >
                  {styleById(id).icon} {styleById(id).label}
                </button>
              ))}
            </div>
          </Reveal>
        )}

        {/* Posts */}
        {shown.length > 0 ? (
          <div className="cards-grid">
            {shown.map((post, i) => (
              <Reveal as="article" key={post.title} className="card post-card" delay={(i % 3) * 80}>
                <div className="post-card-meta">
                  <span className="pill pill-subtle">
                    {post.styleMeta.icon} {post.styleMeta.label}
                  </span>
                  <span className="post-card-date">
                    {post.dateLabel} · {post.readMins} min
                  </span>
                </div>
                <h3 className="card-title">{post.title}</h3>
                <p className="card-body">{post.excerpt}</p>
                <div className="card-footer">
                  <button type="button" className="link-arrow" onClick={() => setActivePost(post)}>
                    Read the piece
                    <Icon name="arrowRight" />
                  </button>
                </div>
              </Reveal>
            ))}
          </div>
        ) : (
          <Reveal className="card empty-state">
            <p>
              Nothing here yet — open <code>src/writing.js</code>, add your first post, and it will appear.
            </p>
          </Reveal>
        )}
      </div>

      {activePost && <PostReader post={activePost} onClose={() => setActivePost(null)} />}
      {activeStyle && <StyleGuide style={activeStyle} onClose={() => setActiveStyle(null)} />}
    </section>
  );
}