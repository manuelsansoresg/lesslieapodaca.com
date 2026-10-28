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
export function Landing() {
  return (
    <>
      <Header brand={<Brand />} />
      <main id="contenido">
        <Hero />
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
        <a
          className="mobile-purchase"
          href={site.book.purchaseUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          Comprar mi libro ↗
        </a>
      )}
    </>
  );
}
