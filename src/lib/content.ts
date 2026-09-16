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

export const galeriaCategorias = [
  {
    slug: "15-anos",
    title: "15 Años",
    description:
      "Sesiones y coberturas de fiesta para el día que soñaste, de principio a fin.",
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
    slug: "bodas",
    title: "Bodas",
    description:
      "Cobertura completa de tu casamiento, de los preparativos a la última bailada.",
    photos: [
      "/images/bodas-1.jpg",
      "/images/bodas-2.jpg",
      "/images/bodas-3.jpg",
      "/images/bodas-4.jpg",
      "/images/bodas-5.jpg",
      "/images/bodas-6.jpg",
    ],
  },
  {
    slug: "egresados",
    title: "Egresados",
    description: "La fiesta de egresados capturada como se vive: a full.",
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
  whatsapp: "https://wa.me/5493510000000",
  instagram: instagramUrl,
  email: "hola@fotosfreedom.com",
  location: "Córdoba, Argentina",
};
