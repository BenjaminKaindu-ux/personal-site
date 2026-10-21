import { styleById } from "../styles";
import Markdown from "../markdown";
import Icon from "./icons";
import { useLiveContent } from "../live";
import { respondHref } from "../respond";
import { Empty, TagList, SampleBadge, LiveBadge } from "./ui";

/**
 * Shared article reader for essays and learning notes.
 * `kind` is "essays" | "notes"; `slug` comes from the route.
 */
export default function ArticlePage({ kind, slug, backView, backLabel }) {
  const { essays, notes } = useLiveContent();
  const list = kind === "essays" ? essays : notes;
  const item = list.find((it) => it.slug === slug);
  const style = item?.style ? styleById(item.style) : null;

  if (!item) {
    return (
      <section className="page">
        <div className="container narrow">
          <Empty
            title="Not found"
            lede={`That ${kind === "essays" ? "essay" : "note"} doesn’t exist or may have been removed.`}
          />
          <div className="actions-row">
            <a className="btn btn-ghost" href={`#/${backView}`}>
              <Icon name="arrowLeft" /> Back to {backLabel}
            </a>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="page">
      <div className="container narrow">
        <a className="back-link" href={`#/${backView}`}>
          <Icon name="arrowLeft" /> {backLabel}
        </a>

        <article className="article">
          <header className="article-head">
            <div className="article-badges">
              {style ? <span className="pill">{style.icon} {style.label}</span> : null}
              {kind === "notes" && <span className="pill pill-sage">Learning note</span>}
              <LiveBadge live={item.live} />
              <SampleBadge status={item.status} />
            </div>
            <h1 className="article-title">{item.title}</h1>
            <div className="article-meta">
              {item.dateLabel && <span className="meta-bit">{item.dateLabel}</span>}
              <span className="meta-bit">{item.readMins} min read</span>
            </div>
            <TagList tags={item.tags} />
          </header>

          <Markdown text={item.body} />

          <footer className="article-foot">
            <p className="article-invite">Enjoyed it? Disagree? Found a better answer?</p>
            <a className="btn btn-primary" href={respondHref(item.title)}>
              <Icon name="reply" /> Respond to this {kind === "essays" ? "essay" : "note"}
            </a>
            <a className="btn btn-ghost" href={`#/${backView}`}>
              <Icon name="arrowLeft" /> More {backLabel}
            </a>
          </footer>
        </article>
      </div>
    </section>
  );
}