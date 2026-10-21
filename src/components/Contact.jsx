import { profile, socials } from "../config";
import Icon from "./icons";
import Reveal from "./Reveal";
import { PageHead } from "./ui";

export default function Contact({ subject }) {
  const primarySub = subject || "Hello from your website";

  return (
    <section className="page">
      <div className="container narrow">
        <PageHead
          eyebrow="Contact"
          title="The inbox is open"
          lede={
            subject
              ? "You’re responding to something you read — thank you. Your subject line is already filled in."
              : "No comment forms, no account needed — just email. I read everything and usually get back within a few days."
          }
        />

        <div className="contact-grid">
          <Reveal className="contact-card">
            <span className="contact-icon"><Icon name="mail" /></span>
            <div>
              <h3 className="card-title">Primary</h3>
              <a className="contact-email" href={`mailto:${profile.email.primary}?subject=${encodeURIComponent(primarySub)}`}>
                {profile.email.primary}
              </a>
              <p className="contact-hint">Best way to reach me — used for responding to essays and projects.</p>
            </div>
          </Reveal>

          <Reveal delay={80} className="contact-card">
            <span className="contact-icon"><Icon name="mail" /></span>
            <div>
              <h3 className="card-title">Secondary</h3>
              <a className="contact-email" href={`mailto:${profile.email.secondary}?subject=${encodeURIComponent(primarySub)}`}>
                {profile.email.secondary}
              </a>
              <p className="contact-hint">A good fallback if the first address bounces.</p>
            </div>
          </Reveal>
        </div>

        <Reveal>
          <div className="contact-note">
            <Icon name="leaf" />
            <p>
              Want to respond to something specific? Use the <strong>Respond</strong> link at the end
              of any essay, project, or idea — it opens an email with the title already in the subject.
            </p>
          </div>
        </Reveal>

        <Reveal>
          <h2 className="block-title">Elsewhere on the web</h2>
          <div className="socials-grid">
            {socials
              .filter((s) => s.url)
              .map((s) => (
                <a key={s.label} className="social-card" href={s.url} target="_blank" rel="noreferrer">
                  <span className="social-icon"><Icon name={s.icon} /></span>
                  <span>
                    <strong>{s.label}</strong>
                    <small>{s.url.replace(/^https?:\/\/(www\.)?/, "")}</small>
                  </span>
                  <Icon name="external" className="social-out" />
                </a>
              ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}