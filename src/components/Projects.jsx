import { projects } from "../config";
import Icon from "./icons";
import Reveal from "./Reveal";

export default function Projects() {
  return (
    <section id="projects" className="section">
      <div className="container">
        <div className="section-head">
          <Reveal>
            <span className="eyebrow">Projects</span>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="section-title">Things I’ve made</h2>
          </Reveal>
        </div>

        <div className="cards-grid">
          {projects.map((project, i) => (
            <Reveal
              as="article"
              key={project.title}
              className="card project-card"
              delay={(i % 3) * 90}
            >
              <div className="project-top">
                <span className="project-icon" aria-hidden="true">
                  {project.icon}
                </span>
                {project.featured && <span className="pill">Featured</span>}
              </div>
              <h3 className="card-title">{project.title}</h3>
              <p className="card-body">{project.description}</p>
              {project.tags?.length > 0 && (
                <ul className="tag-list">
                  {project.tags.map((tag) => (
                    <li key={tag} className="tag">
                      {tag}
                    </li>
                  ))}
                </ul>
              )}
              <div className="card-footer">
                {project.url ? (
                  <a
                    className="link-arrow"
                    href={project.url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    See it live
                    <Icon name="external" />
                  </a>
                ) : (
                  <span className="link-arrow muted">Coming soon</span>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}