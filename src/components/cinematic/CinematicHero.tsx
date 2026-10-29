"use client";

import { CTA } from "../CTA";
import Image, { getImageProps } from "next/image";
import { useHeroMotion } from "./useHeroMotion";
import styles from "./cinematic.module.css";

const mobile = getImageProps({ src: "/images/lesslie/autora/retrato-estudio-conceptual.png", alt: "", width: 1672, height: 941, sizes: "135vh" }).props;

export function CinematicHero() {
  const scope = useHeroMotion();
  return (
    <section ref={scope} id="inicio" className={styles.hero} aria-labelledby="cinematic-title">
      <div className={styles.scene} data-scene>
        <picture>
          <source media="(max-width: 800px)" srcSet={mobile.srcSet} sizes="135vh" />
          <Image data-photo className={styles.photo} src="/images/lesslie/autora/retrato-estudio-conceptual.png" alt="Lesslie Apodaca" width={1672} height={941} sizes="100vw" loading="eager" fetchPriority="high" />
        </picture>
      </div>
      <div className={styles.shade} aria-hidden="true" />
      <div className={styles.light} data-light aria-hidden="true" />
      <div className={styles.copy} data-copy>
        <p className={styles.label} data-label><span />ACTRIZ · ESCRITORA</p>
        <h1 id="cinematic-title" className={styles.name}>
          <span data-name>Lesslie</span>{" "}<span data-name>Apodaca</span>
        </h1>
        <p className={styles.narrative} data-narrative>Hay historias que se interpretan.<br /><em>Otras nacen para ser escritas.</em></p>
        <p className={styles.intro} data-intro>De dar vida a personajes a crear sus propias historias. Descubre su trayectoria artística y el universo de su primera novela.</p>
        <div className={styles.actions} data-actions>
          <CTA tone="gold" href="#mi-novela">Descubre mi novela</CTA>
          <CTA variant="secondary" tone="ivory" href="#trayectoria">Explora mi trayectoria</CTA>
        </div>
      </div>
      <a className={styles.scroll} data-scroll href="#mi-novela"><span aria-hidden="true" />DESLIZA PARA DESCUBRIR</a>
      <span className={styles.signature} aria-hidden="true">Entre la escena y las letras</span>
    </section>
  );
}
