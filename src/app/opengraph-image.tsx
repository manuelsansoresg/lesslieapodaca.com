import { ImageResponse } from "next/og";
export const alt = "Lesslie Apodaca — Actriz y escritora";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function Image() {
  return new ImageResponse(
    <div
      style={{
        background: "#342103",
        color: "#F8F3E9",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          fontSize: 18,
          letterSpacing: 7,
          color: "#D5A14F",
          marginBottom: 42,
        }}
      >
        ACTRIZ & ESCRITORA
      </div>
      <div style={{ fontSize: 88 }}>Lesslie Apodaca</div>
      <div style={{ fontSize: 26, marginTop: 38 }}>
        Entre la escena y la página.
      </div>
    </div>,
    { ...size },
  );
}
