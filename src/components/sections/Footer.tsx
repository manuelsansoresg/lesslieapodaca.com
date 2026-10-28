import { copy } from "@/lib/copy";
import { navigation, site } from "@/lib/content";
import { Brand } from "../Brand";
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
            {site.contactEmail ? (
              <a className="text-link" href={"mailto:" + site.contactEmail}>
                {site.contactEmail} ↗
              </a>
            ) : (
              <p className="muted">{copy.footer3}</p>
            )}
            <a
              className="text-link"
              href={site.social.facebook}
              target="_blank"
              rel="noopener noreferrer"
            >
              Facebook <span aria-hidden="true">↗</span>
            </a>
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
