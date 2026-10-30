import Image from "next/image";
import logo from "../../public/images/lesslie/marca/logolesslie.png";
export function Brand({ large = false }: { large?: boolean }) {
  return (
    <Image
      className={large ? "brand-image brand-large" : "brand-image"}
      src={logo}
      sizes={large ? "180px" : "(max-width: 800px) 64px, 84px"}
      alt="Lesslie Apodaca"
      priority
    />
  );
}
