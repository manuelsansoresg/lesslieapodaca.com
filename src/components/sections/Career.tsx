import { copy } from "@/lib/copy";
import { site } from "@/lib/content";
import { EditorialImage } from "../EditorialImage";
export function Career() {
  return (
    <section id="trayectoria" className="career-section section-space">
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
        <ol className="timeline">
          {site.productions.map((p) => (
            <li key={p.title}>
              <span className="timeline-year">{p.year}</span>
              <article className="production">
                <EditorialImage
                  src={p.image}
                  alt={"Lesslie como " + p.character + " en " + p.title}
                  label="Fotografía de producción"
                  kind="landscape"
                />
                <div>
                  <p className="eyebrow">{copy.career3}</p>
                  <h3>{p.title}</h3>
                  <p>
                    Personaje: <strong>{p.character}</strong>
                  </p>
                </div>
              </article>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
