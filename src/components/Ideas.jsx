import { content } from "../content";
import Icon from "./icons";
import Reveal from "./Reveal";
import { PageHead, Empty } from "./ui";
import { respondHref } from "../respond";

export default function Ideas() {
  const items = content.ideas;
  return (
    <section className="page">
      <div className="container">
        <PageHead
          eyebrow="Ideas & insights"
          title="Open threads"
          lede="Short reflections, questions, and unfinished thoughts — the half-formed seeds of the garden. If one catches you, jump in."
        />

        {items.length > 0 ? (
          <div className="ideas-grid">
            {items.map((idea, i) => (
              <Reveal as="article" key={idea.slug} className="card idea-card" delay={(i % 3) * 70}>
                <div className="card-top">
                  <span className="pill pill-sage">
                    {idea.status === "sample" ? "Sample thought" : idea.dateLabel || "Note"}
                  </span>
                </div>
                <h3 className="card-title">{idea.title}</h3>
                {idea.excerpt && <p className="card-excerpt">{idea.excerpt}</p>}
                <div className="card-cta">
                  <a className="text-link" href={respondHref(idea.title)}>
                    <Icon name="reply" /> Jump in
                  </a>
                </div>
              </Reveal>
            ))}
          </div>
        ) : (
          <Empty
            title="No ideas yet"
            lede="Small thoughts will live here — add the first one from the Write studio."
          />
        )}
      </div>
    </section>
  );
}