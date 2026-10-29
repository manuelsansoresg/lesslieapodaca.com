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
        const paperMask = (opening: boolean) => {
          const stage = select("[data-stage]")[0].getBoundingClientRect();
          const frame = select("[data-window]")[0].getBoundingClientRect();
          const top = (frame.top - stage.top) / stage.height * 100;
          const right = (stage.right - frame.right) / stage.width * 100;
          const bottom = (stage.bottom - frame.bottom) / stage.height * 100;
          const edge = (frame.right - stage.left) / stage.width * 100;
          const left = (frame.left - stage.left) / stage.width * 100;
          const tilt = 12 / stage.width * 100;
          return `polygon(${opening ? edge : left + tilt}% ${top}%, ${100 - right}% ${top}%, ${100 - right}% ${100 - bottom}%, ${opening ? edge : left - tilt}% ${100 - bottom}%)`;
        };
        gsap.set("[data-paper]", { clipPath: () => paperMask(true) });
        gsap.set("[data-bridge-copy]", { autoAlpha: 0, y: 20 });
        const sequence = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            id: "career-to-page", trigger: root, pin: select("[data-stage]")[0],
            start: "top 112px", end: () => `+=${Math.round(window.innerHeight * 3.8)}`,
            scrub: 0.65, anticipatePin: 1, invalidateOnRefresh: true, markers,
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
        // A zero-width edge grows across the final frame, then becomes the
        // editorial surface. The opaque plane stays inside its moving mask.
        sequence.addLabel("page", 2.65)
          .to("[data-paper]", { clipPath: () => paperMask(false), duration: 0.95, ease: "power2.inOut" }, "page")
          .to("[data-paper]", { clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)", duration: 1.45, ease: "power2.inOut" }, "page+=0.95")
          .to("[data-bridge-copy]", { autoAlpha: 1, y: 0, duration: 0.58, ease: "power2.out" }, "page+=0.9")
          .to({}, { duration: 0.38 }, "page+=2.4");
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
          <div data-bridge-copy className={`section-wrap ${styles.bridgeCopy}`}>
            <p className="eyebrow">Actriz · Escritora</p>
            <h2>De la escena<br /><em>a la página.</em></h2>
            <span className={styles.inkRule} aria-hidden="true" />
            <p className={styles.bookTitle}>{site.book.title}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
