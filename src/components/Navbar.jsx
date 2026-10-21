import { useEffect, useState } from "react";
import { profile } from "../config";
import Icon from "./icons";

const LINKS = [
  { label: "About", href: "#about" },
  { label: "Writing", href: "#writing" },
  { label: "Projects", href: "#projects" },
  { label: "Ideas", href: "#ideas" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const firstName = profile.name.trim().split(/\s+/)[0] || profile.name;

  return (
    <header className={`nav ${scrolled ? "scrolled" : ""} ${open ? "open" : ""}`}>
      <div className="nav-inner">
        <a href="#top" className="brand" onClick={() => setOpen(false)} aria-label="Back to top">
          <span className="brand-mark" aria-hidden="true">
            ✦
          </span>
          {firstName}
        </a>

        <nav aria-label="Primary">
          <ul className={`nav-links ${open ? "open" : ""}`}>
            {LINKS.map((l) => (
              <li key={l.href}>
                <a href={l.href} onClick={() => setOpen(false)}>
                  {l.label}
                </a>
              </li>
            ))}
            <li className="nav-cta-item">
              <a href={`mailto:${profile.email}`} className="nav-cta" onClick={() => setOpen(false)}>
                Say hello
              </a>
            </li>
          </ul>
        </nav>

        <button
          type="button"
          className="menu-btn"
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <Icon name={open ? "close" : "menu"} />
        </button>
      </div>
    </header>
  );
}