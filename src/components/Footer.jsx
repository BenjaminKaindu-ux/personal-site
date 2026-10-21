import { profile, socials, photoCredit } from "../config";
import Icon from "./icons";

const currentYear = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <p className="footer-name">{profile.name}</p>
          <p className="footer-tagline">{profile.tagline}</p>
        </div>

        <div className="footer-meta">
          <p>
            © {currentYear} {profile.firstName} · Built with React &amp; Vite ·{" "}
            {photoCredit.photographer ? `Photo: ${photoCredit.photographer} (${photoCredit.site})` : ""}
          </p>
          <div className="footer-socials">
            {socials
              .filter((s) => s.url)
              .map((s) => (
                <a
                  key={s.label}
                  href={s.url}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.label}
                  title={s.label}
                >
                  <Icon name={s.icon} />
                </a>
              ))}
          </div>
        </div>
      </div>
    </footer>
  );
}