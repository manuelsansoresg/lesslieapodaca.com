import { copy } from "@/lib/copy";
import { site } from "@/lib/content";
import { EditorialImage } from "../EditorialImage";
export function Purchase() {
  const b = site.book;
  return (
    <section id="compra" className="purchase-section section-space">
      <div className="section-wrap purchase-grid">
        <div>
          <p className="eyebrow">{copy.purchase1}</p>
          <h2>
            {b.title || (
              <>
                Encuentra tu próxima
                <br />
                <em>
                  historia entre
                  <br />
                  estas páginas.
                </em>
              </>
            )}
          </h2>
          <p className="lead">
            {b.shortSynopsis ||
              "Descubre la primera novela de Lesslie Apodaca. La sinopsis y los detalles de edición se incorporarán cuando estén confirmados."}
          </p>
          {(b.price || b.format) && (
            <p className="purchase-details">
              {[b.format, b.price].filter(Boolean).join(" · ")}
            </p>
          )}
          {b.purchaseUrl ? (
            <a
              className="button button-gold"
              href={b.purchaseUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Comprar mi libro <span aria-hidden="true">↗</span>
            </a>
          ) : (
            <>
              <span className="button button-unavailable" aria-disabled="true">
                Comprar mi libro <span aria-hidden="true">↗</span>
              </span>
              <p className="availability-note">{copy.purchase2}</p>
              <a
                className="text-link"
                href={site.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
              >
                {copy.purchase3}
              </a>
            </>
          )}
        </div>
        <div className="purchase-cover">
          <EditorialImage
            src={b.cover}
            alt={
              b.title ? "Portada de " + b.title : "Portada de la primera novela"
            }
            label="Portada de la novela"
            kind="cover"
          />
        </div>
      </div>
    </section>
  );
}
