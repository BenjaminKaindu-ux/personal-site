import { profile } from "../config";
import Icon from "./icons";
import Reveal from "./Reveal";

export default function About() {
  return (
    <section id="about" className="section">
      <div className="container">
        <div className="section-head">
          <Reveal>
            <span className="eyebrow">About</span>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="section-title">The short version</h2>
          </Reveal>
        </div>

        <div className="about-grid">
          <Reveal className="about-bio">
            {profile.bio.map((paragraph, i) => (
              <p key={i} className="lead">
                {paragraph}
              </p>
            ))}

            <ul className="about-facts">
              <li>
                <Icon name="mapPin" />
                <span>
                  Based in <strong>{profile.location}</strong>
                </span>
              </li>
              <li>
                <Icon name="sparkle" />
                <span>
                  Always happy to talk about <strong>AI/ML, ideas & building in public</strong>
                </span>
              </li>
            </ul>

            <div className="about-actions">
              <a className="btn btn-ghost" href={`mailto:${profile.email}`}>
                <Icon name="mail" />
                Write to me
              </a>
              {profile.resumeUrl && (
                <a className="btn btn-ghost" href={profile.resumeUrl} target="_blank" rel="noreferrer">
                  Résumé
                  <Icon name="external" />
                </a>
              )}
            </div>
          </Reveal>

          <Reveal className="about-side" delay={140}>
            <div className="card about-focus">
              <h3 className="card-title">Currently</h3>
              <ul className="chip-list">
                {profile.focus.map((item) => (
                  <li key={item} className="chip">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}