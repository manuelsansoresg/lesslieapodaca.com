"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { CTA } from "../CTA";
import Image from "next/image";
import styles from "./content.module.css";
import { copy } from "@/lib/copy";
import { bookHref, site } from "@/lib/content";
gsap.registerPlugin(useGSAP, ScrollTrigger);

export function Universe() {
  const scope = useRef<HTMLElement>(null);
  useGSAP(() => {
    const media = gsap.matchMedia(scope);
    media.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo(".excerpt", { y: 16, opacity: 0.65 }, {
        y: 0, opacity: 1, duration: 0.8, stagger: 0.08, ease: "power2.out", scrollTrigger: {
          id: "literary-excerpt", trigger: scope.current!.querySelector(".excerpt"), start: "top 88%", once: true,
        },
      });
    });
    return () => media.revert();
  }, { scope });

  return (
    <section
      ref={scope}
      className={`universe-section section-space ${styles.literaryScene}`}
      aria-labelledby="universo-title"
    >
      <Image className={styles.literaryTexture} src="/images/lesslie/fondos/textura-literaria-bugambilia.webp" alt="" fill sizes="100vw" aria-hidden="true" />
      <div className="section-wrap universe-inner">
        <p className="eyebrow">{copy.universe1}</p>
        <h2 id="universo-title">{copy.universeHeading}</h2>
        {site.book.excerpts.map((q) => (
          <figure className={`excerpt ${styles.literaryExcerpt}`} key={q.text}>
            <blockquote>{q.text}</blockquote>
            <figcaption>{q.attribution}</figcaption>
          </figure>
        ))}
        <CTA variant="primary" tone="ivory" className="button" href={bookHref}>
          Descubre la historia
        </CTA>
      </div>
    </section>
  );
}
