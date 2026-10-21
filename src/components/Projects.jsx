import { content } from "../content";
import Icon from "./icons";
import Reveal from "./Reveal";
import { PageHead, Empty, TagList, SampleBadge } from "./ui";

export default function Projects() {
  const items = content.projects;
  return (
    <section className="page">
      <div className="container">
        <PageHead
          eyebrow="Projects"
          title="In the workshop"
          lede="Experiments, tools, and works in progress — with honest statuses. Nothing here is over-sold."
        />

        {items.length > 0 ? (
          <div className="cards-grid">
            {items.map((p, i) => (
              <Reveal as="article" key={p.slug} className="card" delay={(i % 3) * 70}>
                <div className="card-top">
                  <span className={`pill ${p.status === "sample" ? "pill-sage" : "pill-terra"}`}>
                    {p.status === "sample" ? "Sample project" : p.status || "Project"}
                  </span>
                  <SampleBadge status={p.status} />
                </div>
                <h3 className="card-title">
                  <a href={`#/projects/${p.slug}`}>{p.title}</a>
                </h3>
                <p className="card-excerpt">{p.excerpt}</p>
                <TagList tags={p.tags.slice(0, 4)} />
                <div className="card-cta">
                  <a className="text-link" href={`#/projects/${p.slug}`}>
                    Details <Icon name="arrowRight" />
                  </a>
                </div>
              </Reveal>
            ))}
          </div>
        ) : (
          <Empty
            title="No projects yet"
            lede="When something is worth sharing, it will land here — with an honest status."
          />
        )}
      </div>
    </section>
  );
}