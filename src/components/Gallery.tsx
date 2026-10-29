"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import styles from "./sections/content.module.css";
import type { GalleryImage } from "@/lib/content";
gsap.registerPlugin(useGSAP, ScrollTrigger);

export function Gallery({ images }: { images: GalleryImage[] }) {
  const scope = useRef<HTMLElement>(null);
  useGSAP(() => {
    const media = gsap.matchMedia(scope);
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const cards = gsap.utils.toArray<HTMLElement>(".gallery-item", scope.current!);
      cards.forEach((card, index) => {
        // Subtle, individually triggered reveal keeps lower rows visible on mobile.
        gsap.fromTo(card,
          { opacity: 0.84, y: 18 },
          { opacity: 1, y: 0, duration: 0.8, delay: (index % 3) * 0.09,
            ease: "power2.out", clearProps: "opacity,transform",
            scrollTrigger: { trigger: card, start: "top 92%", once: true },
          },
        );
      });
    });
    return () => media.revert();
  }, { scope, dependencies: [images] });
  const [active, setActive] = useState<number | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    if (active !== null) dialog.current?.showModal();
    else dialog.current?.close();
  }, [active]);
  function move(delta: number) {
    setActive((i) =>
      i === null ? null : (i + delta + images.length) % images.length,
    );
  }
  return (
    <section ref={scope} id="galeria" className={`section-wrap section-space ${images.length === 1 ? styles.singleGallery : ""}`}>
      <div className="section-heading">
        <div>
          <p className="eyebrow">05 / Galería</p>
          <h2>
            Instantes que
            <br />
            <em>cuentan algo más.</em>
          </h2>
        </div>
        <p>Retratos, encuentros y vida en escena. Selecciona una imagen para verla en grande.</p>
      </div>
      <div className="gallery-grid">
        {images.map((item, i) => (
          <button
            className="gallery-item"
            key={item.src}
            onClick={() => setActive(i)}
            aria-label={"Ampliar: " + item.alt}
          >
            <Image
              src={item.src}
              alt={item.alt}
              fill
              sizes="(max-width: 800px) calc(100vw - 44px), (max-width: 1100px) 50vw, 620px"
            />
            <span className="gallery-category">{item.category}</span>
            <span className="gallery-open-hint" aria-hidden="true"><span className="gallery-open-icon">↗</span><span>Ver fotografía</span></span>
          </button>
        ))}
      </div>
      <dialog
        ref={dialog}
        className="lightbox"
        aria-label="Visualizador de fotografías"
        onCancel={() => setActive(null)}
        onClick={(e) => {
          if (e.target === e.currentTarget) setActive(null);
        }}
        onKeyDown={(e) => {
          if (e.key === "ArrowLeft") move(-1);
          if (e.key === "ArrowRight") move(1);
        }}
        onClose={() => setActive(null)}
      >
        {active !== null && images[active] && (
          <div className="lightbox-content">
            <button
              className="lightbox-close"
              onClick={() => setActive(null)}
              aria-label="Cerrar visualizador"
            >
              Cerrar ×
            </button>
            <div className="lightbox-image">
              <Image
                src={images[active].src}
                alt={images[active].alt}
                fill
                sizes="90vw"
              />
            </div>
            <div className="lightbox-controls">
              <button onClick={() => move(-1)} aria-label="Fotografía anterior">
                ←
              </button>
              <p>
                {images[active].alt} · {active + 1} / {images.length}
              </p>
              <button onClick={() => move(1)} aria-label="Fotografía siguiente">
                →
              </button>
            </div>
          </div>
        )}
      </dialog>
    </section>
  );
}
