import { Landing } from "@/components/Landing";
import { UnderConstruction } from "@/components/UnderConstruction";
export default function Home() {
  return process.env.SITE_LIVE === "true" ? <Landing cinematic /> : <UnderConstruction />;
}
