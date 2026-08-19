"use client";

import { useState } from "react";

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="nav">
      <div className="nav__inner">
        <a href="#top" className="nav__brand">
          <svg width="22" height="22" viewBox="0 0 40 40" fill="none">
            <circle cx="8" cy="30" r="3" fill="var(--gold)" />
            <circle cx="20" cy="10" r="3" fill="var(--accent)" />
            <circle cx="32" cy="26" r="3" fill="var(--accent)" />
            <path
              d="M8 30 L20 10 L32 26 L8 30"
              stroke="var(--border-strong)"
              strokeWidth="1.2"
              fill="none"
            />
          </svg>
          <span>NDLOVU</span>
        </a>

        <nav className={`nav__links ${menuOpen ? "is-open" : ""}`}>
          <a href="#capacidades" onClick={() => setMenuOpen(false)}>
            Capacidades
          </a>
          <a href="#stack" onClick={() => setMenuOpen(false)}>
            Stack
          </a>
          <a href="#trabalho" onClick={() => setMenuOpen(false)}>
            Trabalho
          </a>
          <a
            href="#contacto"
            className="nav__cta"
            onClick={() => setMenuOpen(false)}
          >
            Fale connosco
          </a>
        </nav>

        <button
          className="nav__toggle"
          aria-label="Abrir menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </header>
  );
}
