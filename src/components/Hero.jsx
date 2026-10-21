import { profile, siteTagline } from "../config";
import Icon from "./icons";
import Reveal from "./Reveal";

export default function Hero() {
  const headline = profile.headline.replaceAll("{{name}}", profile.name);

  return (
    <section id="top" className="hero">
      <div className="hero-veil" aria-hidden="true" />

      <div className="container hero-inner">
        <Reveal>
          <p className="eyebrow hero-eyebrow">{siteTagline}</p>
        </Reveal>

        <Reveal delay={100}>
          <h1 className="hero-title">{headline}</h1>
        </Reveal>

        <Reveal delay={200}>
          <p className="hero-sub">{profile.tagline}</p>
        </Reveal>

        <Reveal delay={300}>
          <div className="hero-actions">
            <a className="btn btn-primary" href="#projects">
              View my projects
              <Icon name="arrowDown" />
            </a>
            <a className="btn btn-ghost" href="#contact">
              <Icon name="mail" />
              Get in touch
            </a>
          </div>
        </Reveal>
      </div>

      <a className="scroll-hint" href="#about" aria-label="Scroll to About section">
        <Icon name="arrowDown" />
      </a>
    </section>
  );
}