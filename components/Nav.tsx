"use client";

import { useState } from "react";
import QABot from "./QABot";

const NAV_LINKS = [
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "#experience", label: "Roadmap" },
  { href: "#personal_interests", label: "Interests" },
  { href: "#contact", label: "Contact" },
];

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [qaOpen, setQaOpen] = useState(false);

  return (
    <>
      <nav className="navbar">
        <div className="container">
          <a href="#" className="logo">
            Manseung<span>Choi</span>
          </a>

          <div
            className={`mobile-menu-toggle${menuOpen ? " active" : ""}`}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </div>

          <div className={`nav-links${menuOpen ? " active" : ""}`}>
            {NAV_LINKS.map((link) => (
              <a key={link.href} href={link.href} onClick={() => setMenuOpen(false)}>
                {link.label}
              </a>
            ))}
          </div>

          <button
            id="qa-nav-btn"
            className="qa-nav-btn"
            type="button"
            onClick={() => setQaOpen(true)}
            title="Ask me anything"
          >
            <span className="qa-nav-label">
              <i className="fas fa-terminal"></i>ask_manseung()
            </span>
            <span className="qa-nav-bot" aria-hidden="true">
              <span className="qa-nav-bot-pixel-head"></span>
              <span className="qa-nav-bot-pixel-antenna"></span>
            </span>
          </button>
        </div>
      </nav>
      <QABot open={qaOpen} onClose={() => setQaOpen(false)} />
    </>
  );
}
