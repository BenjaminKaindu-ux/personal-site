import { profile, socials, learning } from "../config";
import Icon from "./icons";
import Reveal from "./Reveal";
import { PageHead } from "./ui";

export default function About() {
  return (
    <section className="page">
      <div className="container narrow">
        <PageHead
          eyebrow="About"
          title={`Hi, I’m ${profile.firstName}`}
          lede={profile.intro}
        />

        <Reveal>
          <div className="prose-card">
            <p>
              {profile.affiliation} I work at the intersection of AI engineering, machine learning,
              deep learning, and backend engineering with AI and ML — and right now I’m at the
              stage where every day teaches me something new.
            </p>
            <p>
              I’m deliberately honest about where I am: I’ve completed a handful of good courses and
              I’m building my way forward from there. What I lack in years I make up for in reps —
              notebooks, small systems, and a lot of reading the docs.
            </p>
          </div>
        </Reveal>

        <Reveal>
          <h2 className="block-title">Learning &amp; experience</h2>
          <ul className="course-list">
            {learning.courses.map((c) => (
              <li key={c.what} className="course-item">
                <span className="course-dot" aria-hidden="true" />
                <div>
                  <p className="course-what">{c.what}</p>
                  <p className="course-detail">{c.detail}</p>
                </div>
              </li>
            ))}
          </ul>
        </Reveal>

        <div className="about-cols">
          <Reveal>
            <h2 className="block-title">Learning now</h2>
            <ul className="chip-list">
              {learning.currently.map((t) => (
                <li key={t} className="chip">{t}</li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={90}>
            <h2 className="block-title">Exploring</h2>
            <ul className="chip-list">
              {learning.exploring.map((t) => (
                <li key={t} className="chip">{t}</li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal>
          <h2 className="block-title">Beyond the code</h2>
          <div className="prose-card">
            <p>
              This site is my idea garden: essays, ideas, and learning notes, all treated as work in
              progress. Beyond engineering I’m drawn to practical questions — how to learn well, how
              to build honestly — and I’m planning to write about philosophy, including Stoic and
              Catholic thought, as topics for essays rather than as definitive opinions.
            </p>
            <p>
              If you want to talk about any of it, the inbox is open →{" "}
              <a href={`mailto:${profile.email.primary}`}>{profile.email.primary}</a>
            </p>
          </div>
        </Reveal>

        <Reveal>
          <h2 className="block-title">Elsewhere</h2>
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