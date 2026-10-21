import { ideas, profile } from "../config";
import Icon from "./icons";
import Reveal from "./Reveal";

export default function Ideas() {
  return (
    <section id="ideas" className="section">
      <div className="container">
        <div className="section-head">
          <Reveal>
            <span className="eyebrow">Ideas</span>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="section-title">Thoughts & half-formed ideas</h2>
          </Reveal>
          <Reveal delay={140}>
            <p className="section-sub">
              Notes from the notebook — the kind that keep me up slightly too late. If one
              strikes a chord, email me and we’ll talk it through.
            </p>
          </Reveal>
        </div>

        <div className="cards-grid">
          {ideas.map((idea, i) => (
            <Reveal
              as="article"
              key={idea.title}
              className="card idea-card"
              delay={(i % 3) * 90}
            >
              <span className="pill pill-subtle">{idea.status}</span>
              <h3 className="card-title">{idea.title}</h3>
              <p className="card-body">{idea.description}</p>
              <div className="card-footer">
                <a
                  className="link-arrow"
                  href={`mailto:${profile.email}?subject=${encodeURIComponent(
                    `Re: "${idea.title}"`
                  )}`}
                >
                  <Icon name="mail" />
                  Discuss this idea
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}