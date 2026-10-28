import type { Metadata } from "next";
import { Landing } from "@/components/Landing";
export const metadata: Metadata = {
  title: "Vista de desarrollo",
  robots: { index: false, follow: false },
  alternates: { canonical: "/" },
};
export default function Preview() {
  return <Landing />;
}
