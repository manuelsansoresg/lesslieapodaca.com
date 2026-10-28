import Image from "next/image";
export function EditorialImage({
  src,
  alt,
  label,
  kind = "portrait",
  priority = false,
}: {
  src: string | null;
  alt: string;
  label: string;
  kind?: "portrait" | "cover" | "landscape";
  priority?: boolean;
}) {
  return (
    <div className={"editorial-image image-" + kind}>
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={
            kind === "cover"
              ? "(max-width: 720px) 70vw, 380px"
              : "(max-width: 800px) 90vw, 50vw"
          }
          priority={priority}
        />
      ) : (
        <div className="asset-placeholder">
          <span className="placeholder-mark" aria-hidden="true">
            {kind === "cover" ? "L / A" : "LA"}
          </span>
          <span className="placeholder-caption">
            {label}
            <small>Imagen por incorporar</small>
          </span>
        </div>
      )}
    </div>
  );
}
