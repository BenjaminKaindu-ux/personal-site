import { useEffect, useState } from "react";
import { profile } from "../config";
import Icon from "./icons";

const LINKS = [
  { label: "Essays", href: "#/essays" },
  { label: "Ideas", href: "#/ideas" },
  { label: "Projects", href: "#/projects" },
  { label: "Notes", href: "#/notes" },
  { label: "About", href: "#/about" },
  { label: "Contact", href: "#/contact" },
];

export default function Navbar({ view }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const isStudio = view === "studio";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const active = (href) => {
    const target = href.replace(/^#/, "").split("/")[1] || "";
    return view === (target || "home");
  };

  return (
    <header className={`nav ${scrolled ? "scrolled" : ""} ${open ? "open" : ""}`}>
      <div className="container nav-inner">
        <a
          className="brand"
          href="#/"
          onClick={() => {
            setOpen(false);
          }}
          aria-label="Home"
        >
          <span className="brand-mark" aria-hidden="true">
            <Icon name="leaf" />
          </span>
          <span>{profile.firstName}</span>
        </a>

        <nav className="nav-links-wrap" aria-label="Primary">
          <ul className={`nav-links ${open ? "open" : ""}`}>
            {LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className={active(l.href) ? "is-active" : ""}
                  onClick={() => setOpen(false)}
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li className="nav-write">
              <a
                href={isStudio ? "#/" : "#/studio"}
                className="nav-write-btn"
                onClick={() => setOpen(false)}
              >
                <Icon name="pen" />
                Write
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