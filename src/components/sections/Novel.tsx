"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { CTA } from "../CTA";
import styles from "./content.module.css";
import Image from "next/image";
import { copy } from "@/lib/copy";
import { bookHref, site } from "@/lib/content";
import { EditorialImage } from "../EditorialImage";
gsap.registerPlugin(useGSAP, ScrollTrigger);

export function Novel() {
  const scope = useRef<HTMLElement>(null);
  useGSAP(() => {
    const media = gsap.matchMedia(scope);
    media.add({ motion: "(prefers-reduced-motion: no-preference)", mobile: "(max-width: 800px)" }, (context) => {
      if (!context.conditions?.motion) return;
      const mobile = context.conditions.mobile;
      // Translate the existing cover without changing its scale or aspect ratio.
      gsap.fromTo(".book-stage .image-cover", { y: mobile ? 10 : 22, rotationX: mobile ? 0 : 2, transformPerspective: 1000 }, {
        y: mobile ? -10 : -18, rotationX: 0, ease: "none", scrollTrigger: {
          id: "novel-cover", trigger: scope.current, start: "top bottom", end: "bottom top", scrub: 0.5,
        },
      });
      gsap.fromTo(".novel-copy h2", { y: 14, opacity: 0.75 }, {
        y: 0, opacity: 1, duration: 0.6, ease: "power2.out", scrollTrigger: {
          id: "novel-title", trigger: scope.current!.querySelector(".novel-copy"), start: "top 90%", once: true,
        },
      });
    });
    return () => media.revert();
  }, { scope });

  const b = site.book;
  return (
    <section ref={scope} id="mi-novela" className={`novel-section ${styles.literaryScene}`}>
      <Image className={styles.literaryTexture} src="/images/lesslie/fondos/textura-editorial-marfil.webp" alt="" fill sizes="100vw" aria-hidden="true" />
      <div className="section-wrap novel-grid">
        <div className="book-stage">
          <span className="eyebrow">{copy.novel1}</span>
          <EditorialImage
            src={b.cover}
            alt={
              b.title ? "Portada de " + b.title : "Portada de la primera novela"
            }
            label="Portada de la novela"
            kind="cover"
          />
          <span className="book-stage-caption">{copy.novel2}</span>
        </div>
        <div className="novel-copy">
          <p className="eyebrow">{copy.novel3}</p>
          <h2>
            {b.title || (
              <>
                Una historia.
                <br />
                <em>
                  Muchas formas
                  <br />
                  de sentir.
                </em>
              </>
            )}
          </h2>
          <p className="lead">
            {b.synopsis ||
              "Un espacio para descubrir mi primera novela y el universo de emociones que la acompaña."}
          </p>
          <p>
            {b.description ||
              "Aquí podrás conocer el título, la sinopsis y todos los detalles de la historia cuando estén confirmados."}
          </p>
          <ul className="theme-tags" aria-label="Temáticas de la novela">
            {b.themes.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
          <CTA variant="primary" tone="brown" className="button" href={bookHref}>
            Quiero leer esta historia
          </CTA>
        </div>
      </div>
    </section>
  );
}
