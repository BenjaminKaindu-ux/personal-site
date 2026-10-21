import { profile, heroImage, photoCredit } from "../config";
import { useLiveContent } from "../live";
import { styleById } from "../styles";
import Icon from "./icons";
import Reveal from "./Reveal";
import { SectionHead, SampleBadge, LiveBadge, ReadMeta, TagList } from "./ui";

export default function Home() {
  const { essays, ideas, projects, notes } = useLiveContent();
  const latestEssays = essays.slice(0, 3);
  const latestIdeas = ideas.slice(0, 3);
  const latestProjects = projects.slice(0, 3);
  const latestNotes = notes.slice(0, 2);

  return (
    <>
      {/* Hero */}
      <section className="hero" id="home">
        <div className="hero-veil" aria-hidden="true" />
        <div className="container hero-inner">
          <Reveal>
            <p className="eyebrow">A personal idea garden</p>
          </Reveal>
          <Reveal delay={60}>
            <h1 className="hero-title">
              {profile.intro}
            </h1>
          </Reveal>
          <Reveal delay={140}>
            <p className="hero-lede">{profile.summary}</p>
          </Reveal>
          <Reveal delay={220}>
            <div className="hero-actions">
              <a className="btn btn-primary" href="#/essays">
                Read the essays <Icon name="arrowRight" />
              </a>
              <a className="btn btn-ghost" href="#/about">
                About me
              </a>
              <a className="btn btn-ghost" href="#/contact">
                <Icon name="mail" /> Get in touch
              </a>
            </div>
          </Reveal>
        </div>

        {heroImage && (
          <div className="hero-photo" aria-hidden="true">
            <img src={heroImage} alt="" loading="eager" />
            <span className="hero-photo-credit">
              {photoCredit.photographer} · {photoCredit.site}
            </span>
          </div>
        )}
      </section>

      {/* Selected essays */}
      {latestEssays.length > 0 && (
        <section className="section">
          <div className="container">
            <SectionHead
              eyebrow="Selected essays"
              title="From the notebook"
              to="/essays"
              toLabel="All essays"
            />
            <div className="cards-grid">
              {latestEssays.map((e, i) => (
                <Reveal as="article" key={e.slug} className="card" delay={i * 70}>
                  <div className="card-top">
                    <span className="pill">{styleById(e.style).icon} {styleById(e.style).label}</span>
                    <span className="card-badges">
                      <LiveBadge live={e.live} />
                      <SampleBadge status={e.status} />
                    </span>
                  </div>
                  <h3 className="card-title">
                    <a href={`#/essays/${e.slug}`}>{e.title}</a>
                  </h3>
                  <ReadMeta item={e} />
                  <p className="card-excerpt">{e.excerpt}</p>
                  <TagList tags={e.tags.slice(0, 3)} />
                  <div className="card-cta">
                    <a className="text-link" href={`#/essays/${e.slug}`}>
                      Read <Icon name="arrowRight" />
                    </a>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Ideas & projects split */}
      <section className="section section-tint">
        <div className="container">
          <div className="split-grid">
            <div>
              <SectionHead eyebrow="Ideas & insights" title="Open threads" to="/ideas" toLabel="All ideas" />
              {latestIdeas.length > 0 ? (
                <ul className="stack-list">
                  {latestIdeas.map((idea) => (
                    <Reveal as="li" key={idea.slug} className="stack-item">
                      <span>
                        <SampleBadge status={idea.status} />
                        <LiveBadge live={idea.live} />
                      </span>
                      <h3>
                        <a href={`#/ideas`}>{idea.title}</a>
                      </h3>
                      <p>{idea.excerpt}</p>
                    </Reveal>
                  ))}
                </ul>
              ) : (
                <p className="muted">No ideas yet — the garden is waiting for its first seeds.</p>
              )}
            </div>

            <div>
              <SectionHead eyebrow="Projects" title="In the workshop" to="/projects" toLabel="All projects" />
              {latestProjects.length > 0 ? (
                <ul className="stack-list">
                  {latestProjects.map((p) => (
                    <Reveal as="li" key={p.slug} className="stack-item">
                      <span>
                        <SampleBadge status={p.status} />
                        <LiveBadge live={p.live} />
                      </span>
                      <h3>
                        <a href={`#/projects/${p.slug}`}>{p.title}</a>
                      </h3>
                      <p>{p.excerpt}</p>
                    </Reveal>
                  ))}
                </ul>
              ) : (
                <p className="muted">No projects yet.</p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Learning notes */}
      {latestNotes.length > 0 && (
        <section className="section">
          <div className="container">
            <SectionHead eyebrow="Learning notes" title="Notes to self" to="/notes" toLabel="All notes" />
            <div className="cards-grid">
              {latestNotes.map((n, i) => (
                <Reveal as="article" key={n.slug} className="card" delay={i * 70}>
                  <div className="card-top">
                    <span className="pill pill-sage">Learning note</span>
                    <span className="card-badges">
                      <LiveBadge live={n.live} />
                      <SampleBadge status={n.status} />
                    </span>
                  </div>
                  <h3 className="card-title">
                    <a href={`#/notes/${n.slug}`}>{n.title}</a>
                  </h3>
                  <ReadMeta item={n} />
                  <p className="card-excerpt">{n.excerpt}</p>
                  <TagList tags={n.tags.slice(0, 3)} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Footer CTA band */}
      <section className="section section-cta">
        <div className="container">
          <div className="cta-card">
            <h2>Have a thought about any of this?</h2>
            <p>
              I read everything. Email is the front door —
              a response is always welcome.
            </p>
            <a className="btn btn-primary" href="#/contact">
              <Icon name="mail" /> Write to me
            </a>
          </div>
        </div>
      </section>
    </>
  );
}