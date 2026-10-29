import { CTA } from "../CTA";
import { copy } from "@/lib/copy";
import { site } from "@/lib/content";
import { EditorialImage } from "../EditorialImage";
export function Hero() {
  return (
    <section id="inicio" className="hero section-wrap">
      <div className="hero-copy entrance">
        <p className="eyebrow">
          <span className="tiny-line" />
          {copy.hero1}
        </p>
        <h1>
          Hay historias que
          <br />
          se interpretan.
          <br />
          <em>
            Otras nacen para
            <br />
            ser escritas.
          </em>
        </h1>
        <p className="hero-intro">
          Soy Lesslie Apodaca.
          <br />
          Bienvenidos a mi universo, entre la actuación y las letras.
        </p>
        <div className="actions">
          <CTA variant="primary" tone="brown" className="button" href="#mi-novela">
            Descubre mi novela
          </CTA>
          <CTA variant="text" tone="brown" className="text-link" href="#trayectoria">
            Conoce mi trayectoria
          </CTA>
        </div>
      </div>
      <div className="hero-art">
        <span className="vertical-caption" aria-hidden="true">
          {copy.hero2}
        </span>
        <EditorialImage
          src={site.assets.portrait}
          alt="Retrato de Lesslie Apodaca"
          label="Retrato de Lesslie"
          priority
        />
        <div className="image-footnote">
          <span>{copy.hero3}</span>
          <span>{copy.hero4}</span>
        </div>
      </div>
      <a className="scroll-note" href="#mi-novela">
        La siguiente página <span aria-hidden="true">↓</span>
      </a>
    </section>
  );
}
