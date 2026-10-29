import { CTA } from "../CTA";
import { copy } from "@/lib/copy";
import { site } from "@/lib/content";
import { EditorialImage } from "../EditorialImage";
export function Story() {
  return (
    <section id="mi-historia" className="section-wrap story-grid section-space">
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
