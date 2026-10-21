import { profile, photoCredit } from "../config";

const currentYear = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <p>
          © {currentYear} {profile.name}. Made with React & Vite, steeped in nature.
        </p>
        <p className="footer-photo">
          Background photo by {photoCredit.photographer} on {photoCredit.site} — free to use.
        </p>
      </div>
    </footer>
  );
}