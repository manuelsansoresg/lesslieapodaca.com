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

export function Story() {
  const scope = useRef<HTMLElement>(null);
  useGSAP(() => {
    const media = gsap.matchMedia(scope);
    media.add({ motion: "(prefers-reduced-motion: no-preference)", mobile: "(max-width: 800px)" }, (context) => {
      if (!context.conditions?.motion) return;
      const mobile = context.conditions.mobile;
      // One reversible sequence; the copy stays legible throughout.
      const sequence = gsap.timeline({ scrollTrigger: {
        id: "story-reveal", trigger: scope.current, start: "top 85%",
        end: mobile ? "bottom 85%" : "center 55%", scrub: 0.35,
      } });
      sequence
        .fromTo(".story-copy h2", { y: 18, opacity: 0.7 }, { y: 0, opacity: 1, duration: 0.4, ease: "power2.out" }, 0)
        .fromTo(".story-copy > p:not(.eyebrow)", { y: 8, opacity: 0.92 }, { y: 0, opacity: 1, duration: 0.35, stagger: 0.05, ease: "power2.out" }, 0.08)
        .fromTo(".story-image .editorial-image", { clipPath: "inset(0% 0% 100% 0%)" },
          { clipPath: "inset(0% 0% 0% 0%)", duration: 0.65, ease: "power2.inOut" }, mobile ? 0.2 : 0);
    });
    return () => media.revert();
  }, { scope });

  return (
    <section ref={scope} id="mi-historia" className="section-wrap story-grid section-space">
      <div className="story-copy">
        <p className="eyebrow">{copy.story1}</p>
        <h2>{copy.storyHeading}</h2>
        <p className="lead">{copy.story2}</p>
        {site.biography.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        <CTA variant="text" tone="brown" className="text-link" href="#mi-novela">
          Entra en mi universo literario
        </CTA>
      </div>
      <div className="story-image">
        <EditorialImage
          src={site.assets.biography}
          alt="Lesslie Apodaca, actriz, abogada y escritora"
          label="Una historia propia"
        />
        <span className="editorial-note">{copy.story3}</span>
      </div>
    </section>
  );
}
