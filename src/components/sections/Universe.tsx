import { CTA } from "../CTA";
import Image from "next/image";
import styles from "./content.module.css";
import { copy } from "@/lib/copy";
import { bookHref, site } from "@/lib/content";
export function Universe() {
  return (
    <section
      className={`universe-section section-space ${styles.literaryScene}`}
      aria-labelledby="universo-title"
    >
      <Image className={styles.literaryTexture} src="/images/lesslie/fondos/textura-literaria-bugambilia.webp" alt="" fill sizes="100vw" aria-hidden="true" />
      <div className="section-wrap universe-inner">
        <p className="eyebrow">{copy.universe1}</p>
        <h2 id="universo-title">{copy.universeHeading}</h2>
        <p className="universe-description">{copy.universeTransition}</p>
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
