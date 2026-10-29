"use client";

import { useRef, type PointerEvent as ReactPointerEvent } from "react";
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
  const tiltSurface = useRef<HTMLDivElement>(null);
  const tiltArt = useRef<HTMLDivElement>(null);
  const activeTouch = useRef<number | null>(null);
  const tilt = useRef<{ x: (value: number) => void; y: (value: number) => void } | null>(null);

  function resetTilt() {
    tilt.current?.x(0);
    tilt.current?.y(0);
  }

  function moveTilt(event: ReactPointerEvent<HTMLDivElement>) {
    if (event.pointerType === "touch" && activeTouch.current !== event.pointerId) return;
    if (event.pointerType === "pen" && event.buttons === 0) return;
    if (!tilt.current || !tiltSurface.current) return;
    const rect = tiltSurface.current.getBoundingClientRect();
    const horizontal = Math.max(-1, Math.min(1, ((event.clientX - rect.left) / rect.width - 0.5) * 2));
    const vertical = Math.max(-1, Math.min(1, ((event.clientY - rect.top) / rect.height - 0.5) * 2));
    tilt.current.x(-vertical * 9);
    tilt.current.y(horizontal * 11);
  }

  function beginTouch(event: ReactPointerEvent<HTMLDivElement>) {
    if (event.pointerType !== "touch" || activeTouch.current !== null) return;
    activeTouch.current = event.pointerId;
    moveTilt(event);
  }

  function finishTouch(event: ReactPointerEvent<HTMLDivElement>) {
    if (event.pointerType === "touch" && activeTouch.current === event.pointerId) {
      activeTouch.current = null;
      resetTilt();
    }
  }

  useGSAP(() => {
    const surface = tiltArt.current;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (surface && !reducedMotion.matches) {
      gsap.set(surface, { transformPerspective: 1000, transformOrigin: "50% 50%", rotationX: 0, rotationY: 0 });
      tilt.current = {
        x: gsap.quickTo(surface, "rotationX", { duration: 0.55, ease: "power3.out" }),
        y: gsap.quickTo(surface, "rotationY", { duration: 0.55, ease: "power3.out" }),
      };
    }
    const onMotionChange = () => {
      if (reducedMotion.matches) {
        tilt.current = null;
        activeTouch.current = null;
        if (surface) gsap.set(surface, { clearProps: "transform" });
      } else if (surface) {
        tilt.current = {
          x: gsap.quickTo(surface, "rotationX", { duration: 0.55, ease: "power3.out" }),
          y: gsap.quickTo(surface, "rotationY", { duration: 0.55, ease: "power3.out" }),
        };
      }
    };
    reducedMotion.addEventListener("change", onMotionChange);
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
    return () => {
      reducedMotion.removeEventListener("change", onMotionChange);
      tilt.current = null;
      media.revert();
    };
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
          <div
            ref={tiltSurface}
            className="purchase-tilt-surface"
            onPointerMove={moveTilt}
            onPointerDown={beginTouch}
            onPointerUp={finishTouch}
            onPointerCancel={finishTouch}
            onPointerLeave={(event) => {
              if (event.pointerType !== "touch") resetTilt();
            }}
          >
            <div ref={tiltArt} className="purchase-tilt-art">
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
        </div>
      </div>
    </section>
  );
}
