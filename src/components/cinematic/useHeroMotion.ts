"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function useHeroMotion() {
  const scope = useRef<HTMLElement>(null);
  useGSAP(() => {
    const media = gsap.matchMedia(scope);
    media.add({ desktop: "(min-width: 801px)", motion: "(prefers-reduced-motion: no-preference)" }, (context) => {
      if (!context.conditions?.motion) return;
      const desktop = context.conditions.desktop;
      // Leave the server-rendered content visible until the selected photo is ready.
      const photo = scope.current?.querySelector<HTMLImageElement>("[data-photo]");
      const reveal = context.add("reveal", () => {
        if (window.scrollY > 80) return;
        gsap.timeline({ defaults: { ease: "power3.out" } })
          .fromTo("[data-light]", { opacity: 0.8 }, { opacity: 0, duration: 1.5 })
          .fromTo("[data-name]", { clipPath: "inset(0 0 100% 0)", yPercent: 12 }, { clipPath: "inset(0 0 0% 0)", yPercent: 0, duration: 1.25, stagger: 0.14 }, 0.12)
          .from("[data-label]", { opacity: 0, duration: 0.8 }, 0.3)
          .from("[data-narrative]", { opacity: 0, x: -12, duration: 1 }, 0.65)
          .from("[data-intro]", { opacity: 0, duration: 0.85 }, 0.9)
          .from("[data-actions] > a", { opacity: 0, y: 8, stagger: 0.12, duration: 0.7, clearProps: "all" }, 1.12);
      });
      let cancelled = false;
      const ready = () => {
        const decoded = photo?.decode?.() ?? Promise.resolve();
        void decoded.catch(() => {}).then(() => { if (!cancelled) reveal(); });
      };
      if (photo?.complete) ready();
      else photo?.addEventListener("load", ready, { once: true });
      gsap.to("[data-scene]", { yPercent: desktop ? 5 : 2, ease: "none", scrollTrigger: { trigger: scope.current, start: "top top", end: "bottom top", scrub: 0.7 } });
      gsap.to("[data-copy]", { y: desktop ? -28 : -10, opacity: 0.25, ease: "none", scrollTrigger: { trigger: scope.current, start: "top top", end: "bottom 15%", scrub: 0.5 } });
      gsap.to("[data-scroll]", { opacity: 0, ease: "none", scrollTrigger: { trigger: scope.current, start: "top top", end: "top -100px", scrub: true } });
      return () => { cancelled = true; photo?.removeEventListener("load", ready); };
    });
    return () => media.revert();
  }, { scope });
  return scope;
}
