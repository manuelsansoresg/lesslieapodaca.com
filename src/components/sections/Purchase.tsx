"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { CTA } from "../CTA";
import { copy } from "@/lib/copy";
import { site } from "@/lib/content";
import { EditorialImage } from "../EditorialImage";
gsap.registerPlugin(useGSAP, ScrollTrigger);

export function Purchase() {
  const scope = useRef<HTMLElement>(null);
  useGSAP(() => {
    const media = gsap.matchMedia(scope);
    media.add({ motion: "(prefers-reduced-motion: no-preference)", mobile: "(max-width: 800px)" }, (context) => {
      if (!context.conditions?.motion) return;
      const mobile = context.conditions.mobile;
      gsap.fromTo(".purchase-cover .image-cover", { y: mobile ? 10 : 18 }, {
        y: mobile ? -8 : -12, ease: "none", scrollTrigger: {
          id: "purchase-cover", trigger: scope.current, start: "top bottom", end: "bottom top", scrub: 0.5,
        },
      });
      // Never target the CTA, its hover state or its clickable area.
      gsap.fromTo("[data-commercial-copy]", { y: 10, opacity: 0.75 }, {
        y: 0, opacity: 1, duration: 0.5, stagger: 0.05, ease: "power2.out", scrollTrigger: {
          id: "purchase-copy", trigger: scope.current!.querySelector("[data-commercial-copy]"), start: "top 92%", once: true,
        },
      });
    });
    return () => media.revert();
  }, { scope });

  const b = site.book;
  return (
    <section ref={scope} id="compra" className="purchase-section section-space">
      <div className="section-wrap purchase-grid">
        <div>
          <p data-commercial-copy className="eyebrow">{copy.purchase1}</p>
          <h2 data-commercial-copy>
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
          <p data-commercial-copy className="lead">
            {b.shortSynopsis ||
              "Descubre la primera novela de Lesslie Apodaca. La sinopsis y los detalles de edición se incorporarán cuando estén confirmados."}
          </p>
          {(b.price || b.format) && (
            <p className="purchase-details">
              {[b.format, b.price].filter(Boolean).join(" · ")}
            </p>
          )}
          {b.purchaseUrl ? (
            <CTA
              variant="primary" tone="gold" className="button"
              href={b.purchaseUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Comprar mi libro
            </CTA>
          ) : (
            <>
              <CTA tone="gold" className="button" unavailable>
                Comprar mi libro
              </CTA>
              <p className="availability-note">{copy.purchase2}</p>
              <CTA
                variant="text" tone="ivory" className="text-link"
                href={site.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
              >
                {copy.purchase3}
              </CTA>
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
