import { CTA } from "../CTA";
import styles from "./content.module.css";
import Image from "next/image";
import { copy } from "@/lib/copy";
import { bookHref, site } from "@/lib/content";
import { EditorialImage } from "../EditorialImage";
export function Novel() {
  const b = site.book;
  return (
    <section id="mi-novela" className={`novel-section ${styles.literaryScene}`}>
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
