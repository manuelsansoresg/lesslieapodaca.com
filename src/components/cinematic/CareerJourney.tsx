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

// Original photographs supplied for the trajectory sequence.
// Keep their repository filenames (including spaces) unchanged.
const compositions = [
  "/images/lesslie/trayectoria/lesslie trayectoria 1.jpeg",
  "/images/lesslie/trayectoria/lesslie trayectoria 2.jpeg",
  "/images/lesslie/trayectoria/lesslie trayectoria 3.jpeg",
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
        const stage = select("[data-stage]");
        const film = select("[data-film-body]");
        const palette = getComputedStyle(root);
        gsap.set(stage, { backgroundColor: palette.getPropertyValue("--color-brown").trim() });
        gsap.set(film, { autoAlpha: 1 });
        gsap.set("[data-bridge-copy]", { autoAlpha: 0, y: 8 });
        const sequence = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            id: "career-to-page", trigger: root, pin: select("[data-stage]")[0],
            start: "top 112px", end: () => `+=${Math.round(window.innerHeight * 2.8)}`,
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
        // Dissolve the intact final frame as the stage itself changes atmosphere.
        // No covering plane, spatial mask or empty dark interval between scenes.
        sequence.addLabel("page", 2.45)
          .to(stage, {
            backgroundColor: palette.getPropertyValue("--color-ivory").trim(),
            duration: 1, ease: "power1.inOut",
          }, "page")
          .to(film, { autoAlpha: 0, duration: 1, ease: "power1.inOut" }, "page")
          .to("[data-bridge-copy]", { autoAlpha: 1, y: 0, duration: 0.45, ease: "power2.out" }, "page+=0.82")
          .addLabel("reading")
          .to({}, { duration: 0.35 });
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
            <p>Con más de 100 capítulos unitarios en series transmitidas a nivel nacional e internacional por televisión abierta, y cinco participaciones en plataformas como Netflix, ViX, Amazon y HBO Max.</p>
          </div>
          <div className={styles.composition}>
            <figure className={styles.visual}>
              <div className={styles.window}>
                {compositions.map((src, index) => (
                  <div key={src} data-frame className={styles.frame} aria-hidden="true">
                    <div className={styles.portraitCanvas}>
                      <Image src={src} alt="" fill className={styles.framePortrait} sizes="(min-width: 1001px) 250px, 70vw" />
                    </div>
                    <span className={styles.frameCredit}><small>0{index + 1} / 03 · Trayectoria</small>{site.productions[index].title}</span>
                  </div>
                ))}
                <div data-rail-left className={`${styles.rail} ${styles.leftRail}`} aria-hidden="true"><i data-reel /></div>
                <div data-rail-right className={`${styles.rail} ${styles.rightRail}`} aria-hidden="true"><i data-reel /></div>
              </div>
              <figcaption>Fotografías de Lesslie Apodaca.<br />Imágenes ilustrativas de su trayectoria.</figcaption>
            </figure>
            <ol className={styles.credits} aria-label="Producciones de Lesslie Apodaca">
              {site.productions.map((production, index) => (
                <li key={production.title} data-credit className={styles.credit}>
                  <span className={styles.number} aria-hidden="true">0{index + 1}</span>
                  <article>
                    <p className="eyebrow">{production.platform}</p>
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
        <div data-bridge-surface className={styles.bridgeSurface}>
          <div data-bridge-copy className={`section-wrap ${styles.bridgeCopy}`}>
            <div className={styles.bridgeWords}>
              <p className="eyebrow">Actriz · Escritora</p>
              <h2>De la escena<br /><em>a la página.</em></h2>
              <span className={styles.inkRule} aria-hidden="true" />
              <p className={styles.bookTitle}>{site.book.title}</p>
            </div>
            <div className={styles.bridgePhotos}>
              <figure className={`${styles.bridgePhoto} ${styles.bridgePhotoOne}`}>
                <Image
                  src="/images/lesslie/escena/lesslie1.jpeg"
                  alt="Lesslie Apodaca en una fotografía de cuerpo entero"
                  width={720}
                  height={960}
                  sizes="(max-width: 650px) 55vw, (max-width: 850px) 310px, 28vw"
                />
              </figure>
              <figure className={`${styles.bridgePhoto} ${styles.bridgePhotoTwo}`}>
                <Image
                  src="/images/lesslie/escena/lesslie2.jpeg"
                  alt="Retrato de Lesslie Apodaca"
                  width={720}
                  height={960}
                  sizes="(max-width: 650px) 52vw, (max-width: 850px) 290px, 27vw"
                />
              </figure>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
