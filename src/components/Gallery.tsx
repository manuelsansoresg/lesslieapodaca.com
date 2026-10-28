"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import type { GalleryImage } from "@/lib/content";
export function Gallery({ images }: { images: GalleryImage[] }) {
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
    <section id="galeria" className="section-wrap section-space">
      <div className="section-heading">
        <div>
          <p className="eyebrow">05 / Galería</p>
          <h2>
            Instantes que
            <br />
            <em>cuentan algo más.</em>
          </h2>
        </div>
        <p>Retratos, encuentros y vida en escena.</p>
      </div>
      <div className="gallery-grid">
        {images.length
          ? images.map((item, i) => (
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
                  sizes="(max-width: 720px) 90vw, 33vw"
                />
                <span>{item.category} ↗</span>
              </button>
            ))
          : ["Retratos", "Eventos y presentaciones", "En el rodaje"].map(
              (label, i) => (
                <div
                  className={"gallery-placeholder gallery-tone-" + i}
                  key={label}
                >
                  <span className="gallery-number">0{i + 1}</span>
                  <span>
                    {label}
                    <small>Fotografías por incorporar</small>
                  </span>
                </div>
              ),
            )}
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
