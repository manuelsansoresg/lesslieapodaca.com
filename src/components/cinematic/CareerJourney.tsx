"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { site } from "@/lib/content";
import { copy } from "@/lib/copy";
import styles from "./journey.module.css";

gsap.registerPlugin(useGSAP, ScrollTrigger);

// These are existing conceptual compositions, never stills from the credited shows.
const compositions = [
  "/images/lesslie/trayectoria/tira-cinematografica-foto-real.webp",
  "/images/lesslie/trayectoria/retrato-en-set-conceptual.webp",
  "/images/lesslie/trayectoria/estudio-conceptual-vertical.webp",
];

export function CareerJourney() {
  const scope = useRef<HTMLElement>(null);
  useGSAP(() => {
    const root = scope.current!;
    const select = gsap.utils.selector(root);
    const media = gsap.matchMedia(scope);
    // Opt-in diagnostics: /preview?scrollMarkers=1. Never ship markers in production.
    const markers = process.env.NODE_ENV === "development" &&
      new URLSearchParams(window.location.search).has("scrollMarkers");

    media.add({
      desktop: "(min-width: 1001px) and (min-height: 700px)",
      natural: "(max-width: 1000px), (max-height: 699px)",
      reduce: "(prefers-reduced-motion: reduce)",
    }, (context) => {
      if (context.conditions?.reduce) return;
      const frames = select("[data-frame]");
      const credits = select("[data-credit]");
      const lines = select("[data-credit-line]");
      if (context.conditions?.desktop) {
        root.dataset.enhanced = "desktop";
        gsap.set(frames.slice(1), { clipPath: "inset(100% 0% 0% 0%)" });
        gsap.set(credits.slice(1), { color: "#e9d2af" });
        gsap.set(lines, { scaleX: 0, transformOrigin: "left" });
        // Measure the actual film aperture, not a hard-coded rectangle.
        // A polygon keeps every edge within the stage during pin refresh/resizes.
        const frameMask = () => {
          const stage = select("[data-stage]")[0].getBoundingClientRect();
          const frame = select("[data-window]")[0].getBoundingClientRect();
          const pct = (value: number) => Math.max(0, Math.min(100, value));
          const left = pct((frame.left - stage.left) / stage.width * 100);
          const right = pct((frame.right - stage.left) / stage.width * 100);
          const top = pct((frame.top - stage.top) / stage.height * 100);
          const bottom = pct((frame.bottom - stage.top) / stage.height * 100);
          return `polygon(${left}% ${top}%, ${right}% ${top}%, ${right}% ${bottom}%, ${left}% ${bottom}%)`;
        };
        // Keep the paper masked from the first frame; never expose its full box.
        gsap.set("[data-paper]", { clipPath: frameMask, opacity: 0 });
        gsap.set("[data-page-art]", { opacity: 0.65 });
        gsap.set("[data-leaf]", { xPercent: -110, rotation: -14, transformOrigin: "0% 100%" });
        gsap.set("[data-bridge-copy]", { clipPath: "inset(0% 0% 100% 0%)", y: 34 });
        gsap.set("[data-manuscript]", { autoAlpha: 0, y: 18, rotationY: -5, transformPerspective: 1200 });
        gsap.set("[data-manuscript-sheet]", { transformPerspective: 1200, transformStyle: "preserve-3d" });
        gsap.set("[data-manuscript-sheet]:first-child", { transformOrigin: "92% 80%" });
        gsap.set("[data-manuscript-sheet]:nth-child(2)", { transformOrigin: "13% 78%" });
        gsap.set("[data-manuscript-sheet]:last-child", { transformOrigin: "14% 88%" });
        const sequence = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            id: "career-to-page", trigger: root, pin: select("[data-stage]")[0],
            start: "top 112px", end: () => `+=${Math.round(window.innerHeight * 2.8)}`,
            scrub: 0.85, anticipatePin: 1, invalidateOnRefresh: true, markers,
          },
        });
        sequence.to(lines[0], { scaleX: 1, duration: 0.65 }, 0);
        [1, 2].forEach((index) => {
          const at = index * 0.85;
          sequence
            .fromTo(frames[index], { clipPath: "inset(100% 0% 0% 0%)", yPercent: 6 },
              { clipPath: "inset(0% 0% 0% 0%)", yPercent: 0, duration: 0.45, ease: "power2.inOut", immediateRender: false }, at)
            .to(credits[index - 1], { color: "#e9d2af", x: 0, duration: 0.3 }, at)
            .to(credits[index], { color: "#f8f3e9", x: 12, duration: 0.3 }, at)
            .to(lines[index], { scaleX: 1, duration: 0.65 }, at)
            .to("[data-reel]", { yPercent: -index * 12, duration: 0.6 }, at);
        });
        // The final frame becomes the opening of a spread; the same pinned stage
        // carries both scenes, so no second pin or background cut is needed.
        sequence.addLabel("page", 2.55)
          // The film aperture grows to the entire stage. Both opacity and mask
          // advance together so there is never a visible full-screen ivory block.
          .fromTo("[data-paper]", { clipPath: frameMask, opacity: 0 },
            { clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)", opacity: 1,
              duration: 1.35, ease: "power2.inOut", immediateRender: false }, "page")
          .to("[data-film-body]", { y: -18, duration: 0.85 }, "page+=0.12")
          .to("[data-rail-left]", { xPercent: -150, rotation: -12, duration: 0.9 }, "page+=0.12")
          .to("[data-rail-right]", { xPercent: 150, rotation: 12, duration: 0.9 }, "page+=0.12")
          .to("[data-leaf]", { xPercent: 0, rotation: 0, duration: 1.15, stagger: 0.1, ease: "power2.inOut" }, "page+=0.35")
          .to("[data-page-art]", { opacity: 0.22, duration: 0.85 }, "page+=0.4")
          .to("[data-bridge-copy]", { clipPath: "inset(0% 0% 0% 0%)", y: 0, duration: 0.8, ease: "power2.out" }, "page+=0.92")
          .fromTo("[data-manuscript]", { autoAlpha: 0, y: 18, rotationY: -5 },
            { autoAlpha: 1, y: 0, rotationY: 0, duration: 0.85, ease: "power2.out", immediateRender: false }, "page+=1.05")
          // Individual sheets pivot from their own binding edges; the front remains
          // visually anchored while the two rear leaves fan outward.
          .fromTo("[data-manuscript-sheet]:first-child",
            { x: 10, y: 25, rotationX: 6, rotationY: -16, opacity: 0.75 },
            { x: -18, y: -8, rotationX: 1, rotationY: -8, opacity: 1,
              filter: "drop-shadow(7px 13px 12px rgba(52,33,3,.12))", duration: 1.3,
              ease: "power2.inOut", immediateRender: false }, "page+=1.26")
          .fromTo("[data-manuscript-sheet]:nth-child(2)",
            { x: -6, y: 19, rotationX: -5, rotationY: 13, opacity: 0.75 },
            { x: 18, y: -3, rotationX: 0, rotationY: 7, opacity: 1,
              filter: "drop-shadow(10px 15px 12px rgba(52,33,3,.15))", duration: 1.3,
              ease: "power2.inOut", immediateRender: false }, "page+=1.42")
          .fromTo("[data-manuscript-sheet]:last-child",
            { y: 16, rotationX: 8, rotationY: -9, opacity: 0.78 },
            { y: 0, rotationX: 1, rotationY: -2, opacity: 1,
              filter: "drop-shadow(5px 10px 9px rgba(52,33,3,.10))", duration: 1.2,
              ease: "power2.out", immediateRender: false }, "page+=1.62")
          .to({}, { duration: 0.16 });
      } else {
        // Native mobile/tablet scrolling: text remains static and scene changes
        // are discrete instead of tracking every pixel of a fast touch gesture.
        root.dataset.enhanced = "natural";
        const visualFrames = frames as HTMLElement[];
        const showFrame = (index: number, immediate = false) => {
          gsap.killTweensOf(visualFrames);
          const states = visualFrames.map((_, position) => ({
            clipPath: position <= index ? "inset(0% 0% 0% 0%)" : "inset(100% 0% 0% 0%)",
          }));
          if (immediate) {
            visualFrames.forEach((frame, position) => gsap.set(frame, states[position]));
          } else {
            visualFrames.forEach((frame, position) => gsap.to(frame, {
              ...states[position], duration: 0.5, ease: "power2.inOut",
              overwrite: true,
            }));
          }
        };
        showFrame(0, true);
        // Progress lines are static on touch devices to avoid rapid flickering.
        gsap.set(lines, { scaleX: 1, transformOrigin: "left" });
        // A brief one-time appearance, no 3D scrub on touch devices.
        gsap.fromTo("[data-manuscript]", { opacity: 0.88, y: 12 }, {
          opacity: 1, y: 0, duration: 0.7, ease: "power2.out",
          scrollTrigger: { trigger: "[data-manuscript]", start: "top 92%", once: true, markers },
        });
        credits.forEach((credit, index) => {
          ScrollTrigger.create({
            id: `career-scene-${index + 1}`,
            trigger: credit,
            start: "top 68%",
            onEnter: () => showFrame(index),
            onEnterBack: () => showFrame(index),
            onLeaveBack: () => { if (index > 0) showFrame(index - 1); },
            markers,
          });
        });
      }
      // Re-measure after a breakpoint removes the desktop pin and changes the flow.
      const refreshFrame = requestAnimationFrame(() => ScrollTrigger.refresh());
      return () => { cancelAnimationFrame(refreshFrame); delete root.dataset.enhanced; };
    });
    // Font metrics can settle after hydration. Refresh once; never on scroll.
    let disposed = false;
    void document.fonts.ready.then(() => { if (!disposed) ScrollTrigger.refresh(); });
    return () => { disposed = true; media.revert(); };
  }, { scope });

  return (
    <section ref={scope} id="trayectoria" className={styles.journey} aria-labelledby="career-title">
      <div data-stage className={styles.stage}>
        <div data-film-body className={`section-wrap ${styles.filmBody}`}>
          <div className={styles.heading}>
            <div><p className="eyebrow">{copy.career1}</p><h2 id="career-title">Historias de las<br /><em>que formo parte.</em></h2></div>
            <p>{copy.career2}</p>
          </div>
          <div className={styles.composition}>
            <figure className={styles.visual}>
              <div data-window className={styles.window}>
                {compositions.map((src, index) => (
                  <div key={src} data-frame className={styles.frame} aria-hidden="true">
                    <Image src={src} alt="" fill sizes="(min-width: 1001px) 44vw, 90vw" />
                    <span className={styles.frameCredit}><small>0{index + 1} / 03 · Trayectoria</small>{site.productions[index].title}</span>
                  </div>
                ))}
                <div data-rail-left className={`${styles.rail} ${styles.leftRail}`} aria-hidden="true"><i data-reel /></div>
                <div data-rail-right className={`${styles.rail} ${styles.rightRail}`} aria-hidden="true"><i data-reel /></div>
              </div>
              <figcaption>Composiciones visuales conceptuales.<br />No son escenas de las producciones.</figcaption>
            </figure>
            <ol className={styles.credits} aria-label="Producciones de Lesslie Apodaca">
              {site.productions.map((production, index) => (
                <li key={production.title} data-credit className={styles.credit}>
                  <span className={styles.number} aria-hidden="true">0{index + 1}</span>
                  <article>
                    <p className="eyebrow">{production.platform}{production.year ? ` · ${production.year}` : ""}</p>
                    <h3>{production.title}</h3>
                    {production.character && <p className={styles.character}>Personaje: <strong>{production.character}</strong></p>}
                  </article>
                  <span data-credit-line className={styles.creditLine} aria-hidden="true" />
                </li>
              ))}
            </ol>
          </div>
          <p className={styles.direction} aria-hidden="true">Continúa el recorrido <span>↓</span></p>
        </div>
        <div data-paper className={styles.paper}>
          <Image data-page-art className={styles.pageArt} src="/images/lesslie/transicion/de-escena-a-pagina.webp" alt="" fill sizes="100vw" aria-hidden="true" />
          <div className={styles.leaves} aria-hidden="true">
            <span data-leaf /><span data-leaf /><span data-leaf />
          </div>
          <div data-bridge-copy className={`section-wrap ${styles.bridgeCopy}`}>
            <div className={styles.bridgeText}>
              <p className="eyebrow">Actriz · Escritora</p>
              <h2>De la escena<br /><em>a la página.</em></h2>
              <span className={styles.inkRule} aria-hidden="true" />
              <p className={styles.bookTitle}>{site.book.title}</p>
            </div>
            <figure data-manuscript className={styles.manuscript} aria-label="Composición editorial de hojas de manuscrito">
              <div data-manuscript-sheet className={`${styles.sheet} ${styles.sheetBack}`} aria-hidden="true">
                <span className={styles.sheetFolio}>Notas de escritura</span>
                <span className={styles.typedLines} />
              </div>
              <div data-manuscript-sheet className={`${styles.sheet} ${styles.sheetMiddle}`} aria-hidden="true">
                <span className={styles.sheetFolio}>Borrador · Ideas</span>
                <span className={styles.typedLines} />
              </div>
              <div data-manuscript-sheet className={`${styles.sheet} ${styles.sheetFront}`} aria-hidden="true">
                <span className={styles.sheetFolio}>El oficio de escribir</span>
                <span className={styles.sheetHeading}>Una historia<br /><i>toma forma.</i></span>
                <span className={styles.sheetRule} />
                <span className={styles.sheetNotes}>Personajes · Memoria · Imaginación</span>
                <span className={styles.typedLines} />
                <span className={styles.sheetPage}>01</span>
              </div>
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}
