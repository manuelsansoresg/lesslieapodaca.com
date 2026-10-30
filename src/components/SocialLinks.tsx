import { site } from "@/lib/content";
import { CTA } from "./CTA";

export function SocialLinks({ tone = "brown" }: { tone?: "brown" | "gold" | "ivory" }) {
  return (
    <div className="social-links" aria-label="Redes sociales de Lesslie Apodaca">
      <CTA variant="text" tone={tone} href={site.social.instagram} target="_blank" rel="noopener noreferrer">
        Instagram
      </CTA>
      <CTA variant="text" tone={tone} href={site.social.facebook} target="_blank" rel="noopener noreferrer">
        Facebook
      </CTA>
    </div>
  );
}
