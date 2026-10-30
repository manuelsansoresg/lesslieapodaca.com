import { CTA } from "./CTA";
import { copy } from "@/lib/copy";
import { Brand } from "./Brand";
import { site } from "@/lib/content";
import { SocialLinks } from "./SocialLinks";
export function UnderConstruction() {
  return (
    <div className="construction">
      <main id="contenido" className="construction-main entrance">
        <Brand large />
        <div className="gold-rule" aria-hidden="true" />
        <p className="eyebrow construction-label">{copy.underConstruction1}</p>
        <h1>
          Un nuevo capítulo
          <br />
          <em>está por comenzar</em>
        </h1>
        <p className="construction-subtitle">{copy.underConstruction2}</p>
        <p className="construction-description">{copy.underConstruction3}</p>
        <CTA
          variant="primary" tone="gold" className="button"
          href={`mailto:${site.contactEmail}`}
        >
          Escríbeme por correo
        </CTA>
        <SocialLinks tone="ivory" />
      </main>
      <footer className="construction-footer">
        © Lesslie Apodaca. Todos los derechos reservados.
      </footer>
    </div>
  );
}
