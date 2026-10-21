import Icon from "./icons";

/* Shared little UI pieces used across pages. */

export function PageHead({ eyebrow, title, lede }) {
  return (
    <header className="page-head">
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h1 className="page-title">{title}</h1>
      {lede && <p className="page-lede">{lede}</p>}
    </header>
  );
}

export function Empty({ title = "Nothing here yet", lede }) {
  return (
    <div className="empty">
      <span className="empty-mark" aria-hidden="true">
        <Icon name="leaf" />
      </span>
      <h3>{title}</h3>
      {lede && <p>{lede}</p>}
    </div>
  );
}

export function ReadMeta({ item }) {
  const bits = [];
  if (item.dateLabel) bits.push(item.dateLabel);
  bits.push(`${item.readMins} min read`);
  return (
    <p className="read-meta">
      {bits.map((b, i) => (
        <span key={i} className="meta-bit">
          {b}
        </span>
      ))}
    </p>
  );
}

export function TagList({ tags }) {
  if (!tags || tags.length === 0) return null;
  return (
    <ul className="tag-row">
      {tags.map((t) => (
        <li key={t} className="tag">
          {t}
        </li>
      ))}
    </ul>
  );
}

export function SampleBadge({ status }) {
  if (status !== "sample") return null;
  return (
    <span className="badge badge-sample" title="This is demo content you can delete anytime.">
      Sample
    </span>
  );
}

export function StatusBadge({ status }) {
  if (!status || status === "sample") return null;
  return <span className="badge">{status}</span>;
}

export function SearchBox({ value, onChange, placeholder = "Search…", label }) {
  return (
    <div className="search-box">
      <Icon name="search" />
      <label className="visually-hidden" htmlFor={`search-${label || "q"}`}>
        {placeholder}
      </label>
      <input
        id={`search-${label || "q"}`}
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoComplete="off"
      />
    </div>
  );
}

export function TagFilter({ tags, active, onSelect }) {
  if (!tags || tags.length === 0) return null;
  return (
    <div className="filter-row" role="group" aria-label="Filter by topic">
      <button
        type="button"
        className={`chip ${active === "" ? "on" : ""}`}
        onClick={() => onSelect("")}
      >
        All topics
      </button>
      {tags.map((t) => (
        <button
          key={t}
          type="button"
          className={`chip ${active === t ? "on" : ""}`}
          onClick={() => onSelect(t)}
        >
          {t}
        </button>
      ))}
    </div>
  );
}

export function SectionHead({ eyebrow, title, lede, to, toLabel }) {
  return (
    <div className="section-head">
      <div className="section-head-text">
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h2 className="section-title">{title}</h2>
        {lede && <p className="section-lede">{lede}</p>}
      </div>
      {to && (
        <a className="text-link" href={`#${to}`}>
          {toLabel || "See all"} <Icon name="arrowRight" />
        </a>
      )}
    </div>
  );
}