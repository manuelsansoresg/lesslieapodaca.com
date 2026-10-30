import { CTA } from "../CTA";
import { copy } from "@/lib/copy";
import { navigation, site } from "@/lib/content";
import { Brand } from "../Brand";
import { SocialLinks } from "../SocialLinks";
export function Footer() {
  return (
    <footer id="contacto" className="site-footer">
      <div className="section-wrap">
        <div className="footer-top">
          <div>
            <p className="eyebrow">{copy.footer1}</p>
            <h2>
              Sigamos
              <br />
              <em>en contacto.</em>
            </h2>
          </div>
          <div className="footer-contact">
            <p>{copy.footer2}</p>
            <CTA className="contact-email-button" href={`mailto:${site.contactEmail}`}>
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true" focusable="false">
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <path d="m3 6 9 7 9-7" />
              </svg>
              Escríbeme por correo
            </CTA>
            <CTA variant="text" tone="brown" className="text-link" href={`mailto:${site.contactEmail}`}>
              {site.contactEmail}
            </CTA>
            <SocialLinks />
          </div>
        </div>
        <div className="footer-bottom">
          <a href="#inicio" aria-label="Volver al inicio">
            <Brand />
          </a>
          <nav aria-label="Navegación secundaria">
            {navigation.map((n) => (
              <a href={"#" + n.id} key={n.id}>
                {n.label}
              </a>
            ))}
          </nav>
          <p>{copy.footer4}</p>
        </div>
      </div>
    </footer>
  );
}
