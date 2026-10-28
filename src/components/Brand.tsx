import Image from "next/image";
import { existsSync } from "node:fs";
import path from "node:path";
export function Brand({ large = false }: { large?: boolean }) {
  const hasLogo = existsSync(
    path.join(process.cwd(), "public/images/logo.png"),
  );
  return hasLogo ? (
    <Image
      className={large ? "brand-image brand-large" : "brand-image"}
      src="/images/logo.png"
      width={480}
      height={240}
      alt="Lesslie Apodaca"
      priority
    />
  ) : (
    <span
      className={
        large ? "brand-wordmark brand-wordmark-large" : "brand-wordmark"
      }
    >
      Lesslie <span>Apodaca</span>
    </span>
  );
}
