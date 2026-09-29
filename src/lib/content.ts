// Copy de ejemplo para completar el sitio mientras se define contenido real.
// Reemplazar textos, fechas y fotos por datos reales del cliente.

export const navLinks = [
  { label: "Inicio", href: "/#inicio" },
  { label: "Nosotros", href: "/#nosotros" },
  { label: "Servicios", href: "/#servicios" },
  { label: "Testimonios", href: "/#testimonios" },
  { label: "Contacto", href: "/#contacto" },
];

export const stats = [
  { value: "10+", label: "Años de experiencia" },
  { value: "500+", label: "Eventos capturados" },
  { value: "Miles", label: "De recuerdos entregados" },
  { value: "Córdoba", label: "Y alrededores" },
];

export const services = [
  {
    slug: "bodas",
    title: "Bodas",
    description: "Cobertura completa de tu casamiento, de principio a fin.",
    image: "/images/bodas-1.jpg",
  },
  {
    slug: "15-anos",
    title: "15 Años",
    description: "Sesiones y cobertura de fiesta para el día que soñaste.",
    image: "/images/servicio-15-anos.jpg",
  },
  {
    slug: "egresados",
    title: "Egresados",
    description: "La fiesta de egresados capturada como se vive: a full.",
    image: "/images/egresados-1.jpg",
  },
  {
    slug: "eventos",
    title: "Eventos",
    description: "Cumpleaños, aniversarios y celebraciones familiares.",
    image: "/images/servicio-eventos.jpg",
  },
  {
    slug: "empresas",
    title: "Empresas",
    description: "Cobertura corporativa: lanzamientos, congresos y más.",
    image: "/images/empresas-3.jpg",
  },
  {
    slug: "moda",
    title: "Moda",
    description: "Producciones de moda, books y desfiles con una mirada editorial.",
    image: "/images/moda-1.jpg",
  },
  {
    slug: "gastronomia",
    title: "Gastronomía",
    description: "Fotografía para bares, restaurantes y eventos gastronómicos.",
    image: "/images/gastronomia-1.jpg",
  },
  {
    slug: "books",
    title: "Books",
    description: "Sesiones personales para tener fotos profesionales tuyas.",
    image: "/images/books-1.jpg",
  },
  {
    slug: "inmobiliarias",
    title: "Inmobiliarias",
    description: "Fotografía de propiedades que resalta cada espacio.",
    image: "/images/inmobiliarias-1.jpg",
  },
  {
    slug: "drone",
    title: "Drone",
    description: "Tomas aéreas que suman una perspectiva única a tu evento.",
    image: "/images/drone-1.jpg",
  },
  {
    slug: "fotografia-video",
    title: "Fotografía y Video",
    description: "Foto y film juntos, para revivir el evento como fue.",
    image: "/images/servicio-foto-video.jpg",
  },
  {
    slug: "total-pics",
    title: "QR Party",
    subtitle: "By Total Pics",
    description:
      "QR en la fiesta: tus invitados suben fotos, se ven en pantalla en vivo y quedan guardadas en un Drive para vos.",
    image: "/images/servicio-qr-party.jpg",
  },
];

type GaleriaSubcategoria = {
  title: string;
  photos: string[];
};

type GaleriaCategoria =
  | {
      slug: string;
      title: string;
      description: string;
      photos: string[];
      subcategorias?: undefined;
    }
  | {
      slug: string;
      title: string;
      description: string;
      subcategorias: GaleriaSubcategoria[];
      photos?: undefined;
    };

export const galeriaCategorias: GaleriaCategoria[] = [
  {
    slug: "15-anos",
    title: "15 Años",
    description:
      "Sesiones y coberturas de fiesta para el día que soñaste, de principio a fin.",
    subcategorias: [
      {
        title: "Previa",
        photos: [
          "/images/hero-15-anos.jpg",
          "/images/galeria-ambar.jpg",
          "/images/galeria-cande.jpg",
          "/images/galeria-pia.jpg",
          "/images/servicio-15-anos.jpg",
          "/images/insta-1.jpg",
        ],
      },
      {
        title: "Fiesta",
        photos: [
          "/images/quince-fiesta-1.jpg",
          "/images/quince-fiesta-2.jpg",
          "/images/quince-fiesta-3.jpg",
          "/images/quince-fiesta-4.jpg",
          "/images/quince-fiesta-5.jpg",
          "/images/quince-fiesta-6.jpg",
        ],
      },
    ],
  },
  {
    slug: "bodas",
    title: "Bodas",
    description:
      "Cobertura completa de tu casamiento, de los preparativos a la última bailada.",
    subcategorias: [
      {
        title: "Civil",
        photos: [
          "/images/bodas-civil-1.jpg",
          "/images/bodas-civil-2.jpg",
          "/images/bodas-civil-3.jpg",
          "/images/bodas-civil-4.jpg",
          "/images/bodas-civil-5.jpg",
          "/images/bodas-civil-6.jpg",
        ],
      },
      {
        title: "Fiesta",
        photos: [
          "/images/bodas-fiesta-1.jpg",
          "/images/bodas-fiesta-2.jpg",
          "/images/bodas-fiesta-3.jpg",
          "/images/bodas-fiesta-4.jpg",
          "/images/bodas-fiesta-5.jpg",
          "/images/bodas-fiesta-6.jpg",
        ],
      },
    ],
  },
  {
    slug: "egresados",
    title: "Egresados",
    description: "La fiesta de egresados capturada como se vive: a full.",
    subcategorias: [
      {
        title: "Presentación de Camperas",
        photos: [
          "/images/egresados-1.jpg",
          "/images/egresados-2.jpg",
          "/images/egresados-3.jpg",
          "/images/egresados-4.jpg",
          "/images/egresados-5.jpg",
          "/images/egresados-6.jpg",
        ],
      },
      {
        title: "Cena de Egresados",
        photos: [
          "/images/egresados-cena-1.jpg",
          "/images/egresados-cena-2.jpg",
          "/images/egresados-cena-3.jpg",
          "/images/egresados-cena-4.jpg",
          "/images/egresados-cena-5.jpg",
          "/images/egresados-cena-6.jpg",
        ],
      },
      {
        title: "Entrega de Diploma",
        photos: [
          "/images/egresados-diploma-1.jpg",
          "/images/egresados-diploma-2.jpg",
          "/images/egresados-diploma-3.jpg",
          "/images/egresados-diploma-4.jpg",
          "/images/egresados-diploma-5.jpg",
          "/images/egresados-diploma-6.jpg",
        ],
      },
    ],
  },
  {
    slug: "empresas",
    title: "Empresas y Corporativo",
    description:
      "Lanzamientos, eventos de marca y cobertura corporativa con mirada profesional.",
    photos: [
      "/images/empresas-3.jpg",
      "/images/empresas-4.jpg",
      "/images/empresas-2.jpg",
      "/images/empresas-1.jpg",
      "/images/empresas-5.jpg",
      "/images/empresas-6.jpg",
    ],
  },
  {
    slug: "moda",
    title: "Moda",
    description:
      "Producciones de moda, desfiles y books de marca con una mirada editorial.",
    photos: [
      "/images/moda-1.jpg",
      "/images/moda-2.jpg",
      "/images/moda-3.jpg",
      "/images/moda-4.jpg",
      "/images/moda-5.jpg",
      "/images/moda-6.jpg",
    ],
  },
  {
    slug: "gastronomia",
    title: "Gastronomía",
    description:
      "Fotografía para bares, restaurantes y eventos gastronómicos.",
    photos: [
      "/images/gastronomia-1.jpg",
      "/images/gastronomia-2.jpg",
      "/images/gastronomia-3.jpg",
      "/images/gastronomia-4.jpg",
      "/images/gastronomia-5.jpg",
      "/images/gastronomia-6.jpg",
    ],
  },
  {
    slug: "books",
    title: "Books",
    description: "Sesiones personales para tener fotos profesionales tuyas.",
    photos: [
      "/images/books-1.jpg",
      "/images/books-2.jpg",
      "/images/books-3.jpg",
      "/images/books-4.jpg",
      "/images/books-5.jpg",
      "/images/books-6.jpg",
    ],
  },
  {
    slug: "inmobiliarias",
    title: "Inmobiliarias",
    description: "Fotografía de propiedades que resalta cada espacio.",
    photos: [
      "/images/inmobiliarias-1.jpg",
      "/images/inmobiliarias-2.jpg",
      "/images/inmobiliarias-3.jpg",
      "/images/inmobiliarias-4.jpg",
      "/images/inmobiliarias-5.jpg",
      "/images/inmobiliarias-6.jpg",
    ],
  },
  {
    slug: "drone",
    title: "Drone",
    description: "Tomas aéreas que suman una perspectiva única a tu evento.",
    photos: [
      "/images/drone-1.jpg",
      "/images/drone-2.jpg",
      "/images/drone-3.jpg",
      "/images/drone-4.jpg",
      "/images/drone-5.jpg",
      "/images/drone-6.jpg",
    ],
  },
];

export const testimonials = [
  {
    name: "Camila & Martín",
    category: "Bodas",
    quote:
      "Superó todas nuestras expectativas. Cada foto tiene una emoción distinta, lograron captar exactamente cómo se sintió nuestro día.",
    avatar: null,
  },
  {
    name: "Sofía",
    category: "15 Años",
    quote:
      "Las fotos de mi 15 quedaron increíbles. Captaron cada detalle y me hicieron sentir cómoda durante toda la fiesta.",
    avatar: null,
  },
  {
    name: "Mariana & Lucas",
    category: "Bodas",
    quote:
      "Profesionales, creativos y con mucho compromiso. Los acompañamos con total confianza y el resultado fue espectacular.",
    avatar: null,
  },
];

export const instagramHandle = "@fotos_freedom";
export const instagramUrl = "https://instagram.com/fotos_freedom";

export const instagramImages = [
  "/images/insta-1.jpg",
  "/images/insta-2.jpg",
  "/images/insta-3.jpg",
  "/images/insta-4.jpg",
  "/images/insta-5.jpg",
  "/images/insta-6.jpg",
];

export const contact = {
  whatsapp: "https://wa.me/5493541376821",
  instagram: instagramUrl,
  email: "sergiovcp18@gmail.com",
  location: "Villa Carlos Paz, Córdoba, Argentina",
};

export function whatsappLink(message: string) {
  return `${contact.whatsapp}?text=${encodeURIComponent(message)}`;
}

export const diferenciales = [
  {
    title: "Fotografía y Video",
    description:
      "Capturamos los momentos importantes y también esos pequeños detalles que muchas veces pasan desapercibidos.",
  },
  {
    title: "Producción",
    description:
      "No nos limitamos a documentar. Pensamos cómo producir contenido que tenga impacto y personalidad.",
  },
  {
    title: "Contenido en Tiempo Real",
    description:
      "Durante el evento generamos Stories, videos y momentos espontáneos para vivir la experiencia también en Instagram esa misma noche.",
  },
  {
    title: "Galería Online Personalizada",
    description:
      "Vos y tus invitados acceden a las fotografías desde un link: las ven, les dan Me Gusta, las descargan y las comparten.",
  },
  {
    title: "Entrevistas y Trends",
    description:
      "Creamos entrevistas con protagonistas e invitados, trends y propuestas para Reels adaptadas a cada evento.",
  },
  {
    title: "Tecnología",
    description:
      "Fotografía, video, iluminación, drone y herramientas digitales según las necesidades del proyecto.",
  },
];

export const contenidoEnRedes = [
  "Stories durante el evento",
  "Reels",
  "Trends",
  "Entrevistas",
  "Contenido espontáneo",
  "Videos detrás de escena",
  "Colaboraciones",
  "Contenido con protagonistas e invitados",
];

export const galeriaOnlineFeatures = [
  "Ver las fotografías desde cualquier dispositivo",
  "Dar Me Gusta a tus favoritas",
  "Descargar las imágenes",
  "Compartirlas con quien quieras",
  "Invitar a familiares y amigos",
  "Volver a disfrutar cada momento cuando quieras",
];

export const proceso = [
  {
    step: "01",
    title: "Nos conocemos",
    description: "Escuchamos tu idea y entendemos qué estás buscando.",
  },
  {
    step: "02",
    title: "Planificamos",
    description: "Pensamos la cobertura y los recursos necesarios.",
  },
  {
    step: "03",
    title: "Producimos",
    description: "Preparamos equipo y propuesta creativa.",
  },
  {
    step: "04",
    title: "Vivimos el momento",
    description: "Vos disfrutás; nosotros buscamos cada emoción y detalle.",
  },
  {
    step: "05",
    title: "Editamos",
    description: "Seleccionamos y editamos cuidadosamente el material.",
  },
  {
    step: "06",
    title: "Entregamos",
    description:
      "Recibís tus recuerdos en formatos pensados para disfrutar y compartir.",
  },
  {
    step: "07",
    title: "Volvés a vivirlo",
    description:
      "Fotografías, videos y galería online para revivir la experiencia.",
  },
];

export const valores = [
  {
    title: "Libertad",
    description: "Libertad para imaginar, crear y hacer las cosas de una manera diferente.",
  },
  { title: "Creatividad", description: "Nuevas formas de contar historias." },
  { title: "Profesionalismo", description: "Responsabilidad, planificación y dedicación." },
  { title: "Innovación", description: "Nuevas herramientas, formatos y tendencias." },
  { title: "Cercanía", description: "Trabajamos con personas, no solamente con clientes." },
  { title: "Compromiso", description: "Nos involucramos con cada proyecto." },
  {
    title: "Emoción",
    description: "Una buena imagen también tiene que transmitir algo.",
  },
];

export const porQueElegirnos = [
  "+10 años de experiencia",
  "Fotografía + Video + Producción",
  "Contenido para redes en tiempo real",
  "Galería online personalizada",
  "Reels, trends y entrevistas",
  "Drone y tecnología audiovisual",
  "Cobertura integral",
  "Atención personalizada",
  "Nos trasladamos a diferentes destinos",
  "Una mirada creativa y propia",
];

export const marcaPalabras = [
  "Creatividad",
  "Energía",
  "Libertad",
  "Experiencia",
  "Emoción",
  "Innovación",
];

export const faqs = [
  {
    question: "¿Dónde trabajan?",
    answer:
      "Estamos ubicados en Villa Carlos Paz, Córdoba, y realizamos producciones en diferentes localidades y destinos.",
  },
  {
    question: "¿Trabajan solamente en eventos?",
    answer:
      "No. También realizamos producción audiovisual, contenido para redes, fotografía comercial, entrevistas y proyectos especiales.",
  },
  {
    question: "¿Realizan fotografía y video?",
    answer: "Sí. Podemos trabajar fotografía, video o una propuesta integral.",
  },
  {
    question: "¿Trabajan con drone?",
    answer: "Sí, dependiendo de las características y condiciones del proyecto.",
  },
  {
    question: "¿Entregan las fotografías online?",
    answer:
      "Sí. Podemos ofrecer una galería online personalizada para ver, seleccionar, descargar y compartir fotografías.",
  },
  {
    question: "¿Generan contenido durante el evento?",
    answer:
      "Sí. Según el servicio contratado podemos generar Stories, Reels, trends, entrevistas y otros contenidos.",
  },
  {
    question: "¿Cuánto cuesta contratar Freedom?",
    answer:
      "El valor depende del tipo de evento y los servicios incluidos. Contactanos y armamos una propuesta.",
  },
];
