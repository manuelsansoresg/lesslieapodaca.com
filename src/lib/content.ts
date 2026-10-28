export type GalleryImage = { src: string; alt: string; category: string };
export const site = {
  name: "Lesslie Apodaca",
  description:
    "El espacio oficial de Lesslie Apodaca, actriz y escritora mexicana. Trayectoria artística y universo literario.",
  social: { facebook: "https://www.facebook.com/SoyLesslieApodaca" },
  contactEmail: null as string | null,
  assets: { portrait: null as string | null, biography: null as string | null },
  biography: null as string | null,
  book: {
    title: null as string | null,
    synopsis: null as string | null,
    description: null as string | null,
    shortSynopsis: null as string | null,
    cover: null as string | null,
    purchaseUrl: null as string | null,
    price: null as string | null,
    format: null as string | null,
    themes: [
      "Romance juvenil",
      "Crecimiento personal",
      "Adolescencia",
      "Emociones",
    ],
    excerpts: [] as { text: string; attribution: string }[],
  },
  productions: [
    {
      title: "Como agua para chocolate",
      character: "Fina",
      year: "2024",
      image: null as string | null,
    },
  ],
  gallery: [] as GalleryImage[],
  press: [] as { title: string; outlet: string; url: string; date?: string }[],
};
export const navigation = [
  { label: "Inicio", id: "inicio" },
  { label: "Mi historia", id: "mi-historia" },
  { label: "Mi novela", id: "mi-novela" },
  { label: "Trayectoria", id: "trayectoria" },
  { label: "Galería", id: "galeria" },
  { label: "Contacto", id: "contacto" },
];
export const bookHref = site.book.purchaseUrl || "#compra";
