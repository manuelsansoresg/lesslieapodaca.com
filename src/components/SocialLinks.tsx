import { site } from "@/lib/content";
import styles from "./social-links.module.css";

export function SocialLinks({ tone = "brown" }: { tone?: "brown" | "gold" | "ivory" }) {
  return (
    <div className={`social-links ${styles.links}`} data-tone={tone} aria-label="Redes sociales de Lesslie Apodaca">
      <a className={styles.link} href={site.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram de Lesslie Apodaca" title="Instagram">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.65" aria-hidden="true" focusable="false">
          <rect x="3" y="3" width="18" height="18" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
        </svg>
      </a>
      <a className={styles.link} href={site.social.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook de Lesslie Apodaca" title="Facebook">
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
          <path d="M14 21v-8h2.8l.45-3.2H14V7.75c0-.93.28-1.55 1.6-1.55h1.75V3.33a23 23 0 0 0-2.55-.13c-2.55 0-4.3 1.56-4.3 4.42V9.8H7.6V13h2.9v8H14Z" />
        </svg>
      </a>
    </div>
  );
}
