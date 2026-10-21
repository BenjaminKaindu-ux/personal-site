import { bySlug } from "../content";
import Markdown from "../markdown";
import Icon from "./icons";
import { Empty, TagList, SampleBadge } from "./ui";
import { respondHref } from "../respond";

export default function ProjectPage({ slug }) {
  const p = bySlug.projects[slug];

  if (!p) {
    return (
      <section className="page">
        <div className="container narrow">
          <Empty title="Project not found" lede="It may have been removed from content/projects/." />
          <div className="actions-row">
            <a className="btn btn-ghost" href="#/projects">
              <Icon name="arrowLeft" /> All projects
            </a>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="page">
      <div className="container narrow">
        <a className="back-link" href="#/projects">
          <Icon name="arrowLeft" /> Projects
        </a>

        <article className="article">
          <header className="article-head">
            <div className="article-badges">
              <span className={`pill ${p.status === "sample" ? "pill-sage" : "pill-terra"}`}>
                {p.status === "sample" ? "Sample project" : p.status || "Project"}
              </span>
              <SampleBadge status={p.status} />
            </div>
            <h1 className="article-title">{p.title}</h1>
            {p.dateLabel && (
              <div className="article-meta">
                <span className="meta-bit">{p.dateLabel}</span>
              </div>
            )}
            <TagList tags={p.tags} />
            {p.links && p.links.length > 0 && (
              <div className="project-links">
                {p.links.map((l) => (
                  <a key={l.url} className="btn btn-ghost" href={l.url} target="_blank" rel="noreferrer">
                    {l.label || "Link"} <Icon name="external" />
                  </a>
                ))}
              </div>
            )}
          </header>

          <Markdown text={p.body} />

          <footer className="article-foot">
            <p className="article-invite">Working on something similar? Curious about the approach?</p>
            <a className="btn btn-primary" href={respondHref(p.title)}>
              <Icon name="reply" /> Talk about this project
            </a>
          </footer>
        </article>
      </div>
    </section>
  );
}