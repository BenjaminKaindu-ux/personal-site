import { profile, socials } from "../config";
import Icon from "./icons";
import Reveal from "./Reveal";

export default function Contact() {
  const available = socials.filter((s) => s.url);

  return (
    <section id="contact" className="section contact-section">
      <div className="container">
        <Reveal className="card contact-card">
          <span className="eyebrow eyebrow-center">Contact</span>
          <h2 className="section-title contact-title">Pull up a chair</h2>
          <p className="contact-blurb">
            I read every message — the deep questions, the project ideas, the “that trail sounds
            lovely” notes, and everything in between. Email is my front door:
          </p>

          <a className="btn btn-primary btn-email" href={`mailto:${profile.email}?subject=${encodeURIComponent(profile.emailSubject)}`}>
            <Icon name="mail" />
            {profile.email}
          </a>

          {available.length > 0 && (
            <div className="socials">
              <p className="socials-label">Elsewhere</p>
              <div className="socials-row">
                {available.map((s) => (
                  <a
                    key={s.label}
                    href={s.url}
                    className="social-btn"
                    target="_blank"
                    rel="noreferrer"
                    aria-label={s.label}
                    title={s.label}
                  >
                    <Icon name={s.icon} />
                    <span>{s.label}</span>
                  </a>
                ))}
              </div>
            </div>
          )}
        </Reveal>
      </div>
    </section>
  );
}