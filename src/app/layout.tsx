import type { Metadata, Viewport } from "next";
import { site } from "@/lib/content";
import "./globals.css";
export const metadata: Metadata = {
  metadataBase: new URL(process.env.SITE_URL || "https://lesslieapodaca.com"),
  title: {
    default: "Lesslie Apodaca | Actriz y escritora",
    template: "%s | Lesslie Apodaca",
  },
  description: site.description,
  openGraph: {
    title: "Lesslie Apodaca | Actriz y escritora",
    description: site.description,
    locale: "es_MX",
    type: "website",
    siteName: site.name,
  },
  twitter: { card: "summary_large_image" },
};
export const viewport: Viewport = { themeColor: "#342103" };
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es-MX">
      <body>
        <a href="#contenido" className="skip-link">
          Saltar al contenido
        </a>
        {children}
      </body>
    </html>
  );
}
