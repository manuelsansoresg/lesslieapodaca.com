import { CTA } from "./CTA";
import { CinematicHeader } from "./cinematic/CinematicHeader";
import { CinematicHero } from "./cinematic/CinematicHero";
import { Brand } from "./Brand";
import { Header } from "./Header";
import { Hero } from "./sections/Hero";
import { Novel } from "./sections/Novel";
import { Story } from "./sections/Story";
import { Career } from "./sections/Career";
import { Universe } from "./sections/Universe";
import { Gallery } from "./Gallery";
import { Press } from "./sections/Press";
import { Purchase } from "./sections/Purchase";
import { Footer } from "./sections/Footer";
import { site } from "@/lib/content";
export function Landing({ cinematic = false }: { cinematic?: boolean }) {
  return (
    <>
      {cinematic ? <CinematicHeader /> : <Header brand={<Brand />} />}
      <main id="contenido">
        {cinematic ? <CinematicHero /> : <Hero />}
        <Novel />
        <Story />
        <Career />
        <Universe />
        <Gallery images={site.gallery} />
        <Press />
        <Purchase />
      </main>
      <Footer />
      {site.book.purchaseUrl && (
        <CTA
          variant="primary" tone="gold" className="mobile-purchase"
          href={site.book.purchaseUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          Comprar mi libro
        </CTA>
      )}
    </>
  );
}
