"use client";
import { CTA } from "./CTA";
import { useState, type ReactNode } from "react";
import { navigation } from "@/lib/content";
export function Header({ brand }: { brand: ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <header className="site-header">
      <div className="header-inner">
        <a
          href="#inicio"
          aria-label="Lesslie Apodaca, inicio"
          onClick={() => setOpen(false)}
        >
          {brand}
        </a>
        <nav className="desktop-nav" aria-label="Navegación principal">
          {navigation.map((n) => (
            <a href={"#" + n.id} key={n.id}>
              {n.label}
            </a>
          ))}
        </nav>
        <CTA href="#mi-novela" variant="secondary" tone="brown" className="header-cta">
          Conoce mi novela
        </CTA>
        <button
          className="menu-button"
          aria-expanded={open}
          aria-controls="mobile-navigation"
          onClick={() => setOpen(!open)}
        >
          {open ? "Cerrar −" : "Menú +"}
        </button>
      </div>
      {open && (
        <nav
          id="mobile-navigation"
          className="mobile-nav"
          aria-label="Navegación móvil"
          onKeyDown={(e) => {
            if (e.key === "Escape") setOpen(false);
          }}
        >
          {navigation.map((n) => (
            <a href={"#" + n.id} key={n.id} onClick={() => setOpen(false)}>
              {n.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
