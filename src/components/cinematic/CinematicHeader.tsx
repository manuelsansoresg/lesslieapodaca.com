"use client";

import { CTA } from "../CTA";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import styles from "./cinematic.module.css";

const navigation = [
  { label: "Inicio", id: "inicio" },
  { label: "Mi historia", id: "mi-historia" },
  { label: "Trayectoria", id: "trayectoria" },
  { label: "Mi novela", id: "mi-novela" },
  { label: "Galería", id: "galeria" },
  { label: "Contacto", id: "contacto" },
];

export function CinematicHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("inicio");
  const dialog = useRef<HTMLDialogElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const close = () => { dialog.current?.close(); setOpen(false); };
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 32);
    update();
    window.addEventListener("scroll", update, { passive: true });
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) if (entry.isIntersecting) setActive(entry.target.id);
    }, { rootMargin: "-15% 0px -60% 0px" });
    navigation.forEach(({ id }) => { const section = document.getElementById(id); if (section) observer.observe(section); });
    return () => { window.removeEventListener("scroll", update); observer.disconnect(); };
  }, []);
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const media = window.matchMedia("(min-width: 1101px)");
    const resize = () => { if (media.matches) close(); };
    media.addEventListener("change", resize);
    return () => { document.body.style.overflow = previous; media.removeEventListener("change", resize); };
  }, [open]);
  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}>
      <div className={styles.headerInner}>
        <a href="#inicio" className={styles.logo} aria-label="Lesslie Apodaca, inicio">
          <Image src="/images/logo.png" alt="Lesslie Apodaca" width={1374} height={1145} sizes="(max-width: 800px) 88px, 120px" priority />
        </a>
        <nav className={styles.desktopNav} aria-label="Navegación principal">
          {navigation.map(({ label, id }) => <a key={id} href={`#${id}`} aria-current={active === id ? "location" : undefined}>{label}</a>)}
        </nav>
        <CTA variant="secondary" tone="gold" className={styles.headerCta} href="#mi-novela">Descubre mi novela</CTA>
        <button ref={toggle} className={styles.menuButton} aria-expanded={open} aria-controls="cinematic-menu" aria-haspopup="dialog" onClick={() => { dialog.current?.showModal(); setOpen(true); }}>Menú <span aria-hidden="true">☰</span></button>
      </div>
      <dialog ref={dialog} id="cinematic-menu" className={styles.menu} aria-label="Menú de navegación" onClose={() => { setOpen(false); toggle.current?.focus(); }} onClick={e => { if (e.target === e.currentTarget) close(); }}>
        <div className={styles.menuTop}><span>Lesslie Apodaca</span><button onClick={close} autoFocus aria-label="Cerrar menú">Cerrar <span aria-hidden="true">×</span></button></div>
        <nav aria-label="Navegación móvil">{navigation.map(({ label, id }, index) => <a key={id} href={`#${id}`} onClick={close} aria-current={active === id ? "location" : undefined}><small aria-hidden="true">0{index + 1}</small>{label}</a>)}</nav>
        <CTA tone="gold" href="#mi-novela" onClick={close}>Descubre mi novela</CTA>
        <p className={styles.menuNote}>Actriz · Escritora</p>
      </dialog>
      <noscript><nav className={styles.fallbackNav} aria-label="Navegación">{navigation.map(({ label, id }) => <a key={id} href={`#${id}`}>{label}</a>)}</nav></noscript>
    </header>
  );
}
