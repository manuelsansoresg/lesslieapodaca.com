import { copy } from "@/lib/copy";
import { site } from "@/lib/content";
import { EditorialImage } from "../EditorialImage";
export function Story() {
  return (
    <section id="mi-historia" className="section-wrap story-grid section-space">
      <div className="story-copy">
        <p className="eyebrow">{copy.story1}</p>
        <h2>
          De interpretar
          <br />
          personajes a<br />
          <em>crear historias.</em>
        </h2>
        <p className="lead">{copy.story2}</p>
        <p>
          {site.biography ||
            "De la actuación a la escritura, este espacio reunirá la historia de Lesslie en sus propias palabras. La biografía completa está pendiente de incorporar."}
        </p>
        <a className="text-link" href="#mi-novela">
          Entra en mi universo literario <span aria-hidden="true">↗</span>
        </a>
      </div>
      <div className="story-image">
        <EditorialImage
          src={site.assets.biography}
          alt="Lesslie Apodaca, actriz y escritora"
          label="Una historia propia"
        />
        <span className="editorial-note">{copy.story3}</span>
      </div>
    </section>
  );
}
