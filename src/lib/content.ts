export type GalleryImage = { src: string; alt: string; category: string };
export const site = {
  name: "Lesslie Apodaca",
  description:
    "El espacio oficial de Lesslie Apodaca, actriz y escritora mexicana. Trayectoria artística y universo literario.",
  social: { facebook: "https://www.facebook.com/SoyLesslieApodaca" },
  contactEmail: null as string | null,
  assets: { portrait: null as string | null, biography: "/images/lesslie/autora/retrato-oficial-iluminacion-pro.webp" },
  biography: [
    "Lesslie Apodaca es actriz, abogada y escritora mexicana. Su recorrido artístico comenzó en la infancia y se ha desarrollado en teatro, televisión, series y cine.",
    "Se tituló como abogada en la Facultad de Derecho de la UNAM y cuenta con estudios de posgrado en materia penal. Su recorrido profesional incluye también actividades sociales, políticas y jurídicas.",
  ],
  book: {
    title: "¿Cómo sabes que es amor?",
    synopsis: "Crecer también es aprender a mirar el amor de otra manera.",
    description: "Acércate a sus páginas y descubre a los personajes que habitan esta historia.",
    shortSynopsis: "Tu próxima lectura empieza aquí.",
    cover: "/images/lesslie/novela/portada-extraida-fotografia.webp",
    purchaseUrl: null as string | null,
    price: null as string | null,
    format: null as string | null,
    themes: [
      "Romance juvenil",
      "Crecimiento personal",
      "Adolescencia",
      "Emociones",
    ],
    excerpts: [
      {
        text: "Quien haya dicho que la adolescencia es la etapa más difícil de la existencia humana no tiene ni la más mínima idea de lo que implica convertirse en adulto.",
        attribution: "Fragmento de la novela",
      },
    ],
  },
  productions: [
    {
      title: "Como agua para chocolate",
      platform: "HBO",
      character: "Fina",
      year: "2024",
      image: null as string | null,
    },
    {
      title: "Cada minuto cuenta",
      platform: "Prime Video",
      character: null,
      year: null,
      image: null as string | null,
    },
    {
      title: "Chespirito: Sin querer queriendo",
      platform: "HBO",
      character: null,
      year: null,
      image: null as string | null,
    },
  ],
  gallery: [
    {
      src: "/images/lesslie/galeria/01-lesslie-libro-real.webp",
      alt: "Lesslie Apodaca con su novela ¿Cómo sabes que es amor?",
      category: "Lesslie y su novela",
    },
  ] as GalleryImage[],
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
