import Image from "next/image";
import styles from "./content.module.css";
import { copy } from "@/lib/copy";
import { site } from "@/lib/content";
import { EditorialImage } from "../EditorialImage";
export function Career() {
  return (
    <section id="trayectoria" className={`career-section section-space ${styles.careerScene}`}>
      <div className={styles.careerAtmosphere} aria-hidden="true">
        <Image src="/images/lesslie/fondos/atmósfera-cine-cafe.webp" alt="" fill sizes="100vw" />
      </div>
      <div className="section-wrap">
        <div className="section-heading">
          <div>
            <p className="eyebrow">{copy.career1}</p>
            <h2>
              Historias de las
              <br />
              <em>que formo parte.</em>
            </h2>
          </div>
          <p>{copy.career2}</p>
        </div>
        <div className={styles.careerComposition}>
          <p className={styles.atmosphereNote}>Atmósfera visual conceptual · Sin fotografías de producción</p>
          <ol className={`timeline ${styles.careerCredits}`}>
          {site.productions.map((p) => (
            <li key={p.title} className={styles.filmographyEntry}>
              <span className="timeline-year" aria-hidden={!p.year || undefined}>{p.year}</span>
              <article className={`production ${!p.image ? styles.textProduction : ""}`}>
                {/* Solo vincular material oficial autorizado a cada producción. */}
                {p.image && <EditorialImage
                  src={p.image}
                  alt={"Participación de Lesslie Apodaca en " + p.title}
                  label="Fotografía de producción"
                  kind="landscape"
                />}
                <div>
                  <p className="eyebrow">{p.platform || copy.career3}</p>
                  <h3>{p.title}</h3>
                  {p.character && <p>Personaje: <strong>{p.character}</strong></p>}
                </div>
              </article>
            </li>
          ))}
        </ol>
        </div>
      </div>
    </section>
  );
}
