import { Fragment, isValidElement } from "react";

/* Inline markdown: **bold**, *italic*, `code`, [text](url), plain text.
   Renders as React nodes; all HTML is escaped (no dangerouslySetInnerHTML). */
function inline(text) {
  const out = [];
  let key = 0;
  let last = 0;
  const add = (node) => out.push(<Fragment key={key++}>{node}</Fragment>);

  const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

  const pattern =
    /(\*\*[^*]+\*\*)|(\*[^*]+(?:\*|$))|(`[^`]+`)|(\[[^\]]+\]\((https?:\/\/[^)]+)\))/g;
  let m;
  while ((m = pattern.exec(text))) {
    if (m.index > last) add(<Fragment key={key++}>{esc(text.slice(last, m.index))}</Fragment>);
    if (m[1]) add(<strong key={key++}>{m[1].slice(2, -2)}</strong>);
    else if (m[2]) add(<em key={key++}>{m[2].replace(/^\*+|\*+$/g, "")}</em>);
    else if (m[3]) add(<code key={key++}>{m[3].slice(1, -1)}</code>);
    else if (m[4]) {
      const bar = m[4].indexOf("](");
      const label = m[4].slice(1, bar);
      const url = m[4].slice(bar + 2, -1);
      add(
        <a key={key++} href={url} target="_blank" rel="noreferrer">
          {label}
        </a>
      );
    }
    last = m.index + m[0].length;
  }
  if (last < text.length) add(<Fragment key={key++}>{esc(text.slice(last))}</Fragment>);
  return out.length === 1 && !isValidElement(out[0]) ? out : out;
}

/* Block-level markdown renderer. Safe: no raw HTML is ever emitted. */
export default function Markdown({ text }) {
  if (!text) return null;
  const lines = (text || "").split(/\r?\n/);
  const blocks = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    // fenced code block
    if (/^```/.test(line.trim())) {
      const lang = line.trim().slice(3).trim();
      let buf = [];
      i++;
      while (i < lines.length && !/^```/.test(lines[i].trim())) {
        buf.push(lines[i]);
        i++;
      }
      i++; // skip closing fence
      blocks.push(
        <pre className="code-block" key={blocks.length}>
          {lang && <span className="code-lang">{lang}</span>}
          <code>{buf.join("\n")}</code>
        </pre>
      );
      continue;
    }

    // blank
    if (!line.trim()) {
      i++;
      continue;
    }

    // heading
    const h = /^(#{1,4})\s+(.*)$/.exec(line);
    if (h) {
      const level = Math.min(4, h[1].length);
      const Tag = "h" + level;
      blocks.push(<Tag className="md-heading" key={blocks.length}>{inline(h[2])}</Tag>);
      i++;
      continue;
    }

    // horizontal rule
    if (/^(\s*[-*_]\s*){3,}$/.test(line.trim())) {
      blocks.push(<hr className="md-hr" key={blocks.length} />);
      i++;
      continue;
    }

    // blockquote
    if (/^>\s?/.test(line)) {
      const buf = [];
      while (i < lines.length && /^>\s?/.test(lines[i])) {
        buf.push(lines[i].replace(/^>\s?/, ""));
        i++;
      }
      blocks.push(<blockquote className="md-quote" key={blocks.length}>{inline(buf.join(" "))}</blockquote>);
      continue;
    }

    // unordered list
    if (/^(\s*)[-*+]\s+/.test(line)) {
      const buf = [];
      while (i < lines.length && /^(\s*)[-*+]\s+/.test(lines[i])) {
        buf.push(lines[i].replace(/^(\s*)[-*+]\s+/, ""));
        i++;
      }
      blocks.push(
        <ul className="md-ul" key={blocks.length}>
          {buf.map((item, j) => (
            <li key={j}>{inline(item)}</li>
          ))}
        </ul>
      );
      continue;
    }

    // ordered list
    if (/^(\s*)\d+[.)]\s+/.test(line)) {
      const buf = [];
      while (i < lines.length && /^(\s*)\d+[.)]\s+/.test(lines[i])) {
        buf.push(lines[i].replace(/^(\s*)\d+[.)]\s+/, ""));
        i++;
      }
      blocks.push(
        <ol className="md-ol" key={blocks.length}>
          {buf.map((item, j) => (
            <li key={j}>{inline(item)}</li>
          ))}
        </ol>
      );
      continue;
    }

    // paragraph (collect until blank / structural line)
    const buf = [line];
    i++;
    while (
      i < lines.length &&
      lines[i].trim() &&
      !/^(#{1,4})\s+/.test(lines[i]) &&
      !/^```/.test(lines[i].trim()) &&
      !/^>\s?/.test(lines[i]) &&
      !/^(\s*)[-*+]\s+/.test(lines[i]) &&
      !/^(\s*)\d+[.)]\s+/.test(lines[i])
    ) {
      buf.push(lines[i]);
      i++;
    }
    blocks.push(
      <p className="md-paragraph" key={blocks.length}>{inline(buf.join(" "))}</p>
    );
  }

  return <div className="markdown">{blocks}</div>;
}