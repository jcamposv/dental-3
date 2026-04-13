// ============================================================
// DATOS DEL SITIO — Edita este archivo para personalizar contenido.
// Reemplaza URLs de Unsplash con imágenes locales en /public/images/
// ============================================================

export const siteConfig = {
  name: "Agatha James",
  title: "Dra. Agatha James — Odontología Estética y Cosmética",
  description:
    "Tu dentista de confianza, especializada en odontología estética y cosmética. Consulta gratuita disponible.",
  url: "https://dra-agathajames.com",
};

export const booking = {
  whatsapp: {
    number: "15552345678",
    defaultMessage:
      "Hola, me gustaría agendar una cita con la Dra. Agatha James.",
  },
  googleCalendar: {
    enabled: false,
    calendarId: "primary",
  },
};

export const navigation = [
  { label: "Servicios", href: "#servicios" },
  { label: "Sobre Mí", href: "#sobre-mi" },
  { label: "Educación", href: "#educacion" },
  { label: "FAQ", href: "#faq" },
];

// ============================================================
// IMÁGENES — Reemplaza con archivos locales en /public/images/
// ============================================================
import heroImgFile from "../assets/images/doctora.jpg";
import oclusodontiaImg from "../assets/images/oclusodontia.jpg";
import esteticaDentalImg from "../assets/images/estetica-dental.jpg";
import ortodonciaImg from "../assets/images/ortodoncia.jpg";
import protesisDentalImg from "../assets/images/protesis-dental.jpg";
import campanaPreventivaImg from "../assets/images/campana-preventiva.jpg";
import planNutricionalImg from "../assets/images/plan-nutricional-dental.jpg";

export const images = {
  hero: heroImgFile.src,
  about:
    "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=600&q=80",
  education: heroImgFile.src,
  services: [
    oclusodontiaImg.src,
    esteticaDentalImg.src,
    ortodonciaImg.src,
    protesisDentalImg.src,
    campanaPreventivaImg.src,
    planNutricionalImg.src,
  ],
};

export const hero = {
  badge: "Odontología Estética & Cosmética",
  headline: "Tu dentista de confianza y especializada",
  subtext:
    "Hola, soy Agatha James, tu dentista especializada en Oclusodontia y Odontología Cosmética.",
  cta: { primary: "Agenda tu cita · es gratis", secondary: "Cómo funciona" },
  features: [
    { label: "Revisión Gratuita", desc: "Tu primera revisión es sin costo" },
    {
      label: "Plan de Tratamiento",
      desc: "Recibe tu plan personalizado en 1 semana",
    },
  ],
  stats: [
    { value: "7+", label: "Años Experiencia" },
    { value: "840", label: "Reseñas" },
    { value: "123K+", label: "Pacientes Felices" },
    { value: "20K+", label: "Sonrisas Creadas" },
  ],
};

export const services = [
  {
    index: "01",
    title: "Oclusodontia",
    description:
      "Diagnósticos precisos del origen de tu dolor para un tratamiento enfocado y efectivo.",
  },
  {
    index: "02",
    title: "Estética Dental",
    description:
      "Diagnósticos precisos para lograr la sonrisa natural y armónica que siempre soñaste.",
  },
  {
    index: "03",
    title: "Ortodoncia",
    description:
      "Dispositivos y alineadores que corrigen la posición de tus dientes de forma discreta.",
  },
  {
    index: "04",
    title: "Prótesis Dental",
    description:
      "Restauraciones que devuelven la función y estética a tu sonrisa con materiales de primera.",
  },
  {
    index: "05",
    title: "Campaña Preventiva",
    description:
      "Programas de prevención y educación dental para toda la familia.",
  },
  {
    index: "06",
    title: "Plan Nutricional Dental",
    description:
      "Diagnósticos y planes alimenticios diseñados para fortalecer tu salud bucal.",
  },
];

export const welcomeText =
  "Te doy la bienvenida a mi consultorio ubicado en Av. Reforma 245, en el corazón de Ciudad de México.";

export const education = {
  heading: "Educación y títulos superiores",
  diplomas: {
    label: "Diplomas",
    items: [
      "Diploma de Doctora en Cirugía Dental — Universidad Nacional Autónoma de México",
      "D.U. Oclusodontia — Universidad de Guadalajara",
    ],
  },
  certificates: {
    label: "Certificados",
    items: [
      "Diploma de Doctora en Cirugía Dental — UNAM",
      "D.U. Oclusodontia — Universidad de Guadalajara",
    ],
  },
  practice: {
    label: "Práctica",
    items: [
      "C.E.S. Prótesis fija, oclusión y prácticas multidisciplinarias — UNAM",
      "Pasantías internacionales y formación privada avanzada",
    ],
  },
  quote:
    "Mi formación académica se enriqueció con pasantías internacionales, práctica privada y formación universitaria continua.",
};

export const testimonials = [
  {
    name: "Mariana García",
    label: "Paciente Feliz",
    review:
      "Siempre tuve terror de ir al dentista, pero este lugar cambió todo. La Dra. Agatha es tan amable y paciente, explicando todo para calmar mi ansiedad. Ya no siento miedo.",
  },
  {
    name: "Laura Sánchez",
    label: "Paciente Feliz",
    review:
      "Siempre tuve terror de ir al dentista, pero este lugar cambió completamente mi perspectiva. La Dra. Agatha es amable, paciente y profesional. La recomiendo totalmente.",
  },
];

export const faq = [
  {
    question: "¿La primera consulta es gratuita?",
    answer:
      "Sí, tu primera consulta es completamente gratuita. Te haremos una revisión general de 30 minutos para evaluar tu salud bucal y crear un plan de tratamiento personalizado.",
  },
  {
    question: "¿Puedo cambiar mi plan después?",
    answer:
      "Por supuesto. Tu plan de tratamiento es flexible y puede ajustarse en cualquier momento según tus necesidades y preferencias.",
  },
  {
    question: "¿Cuál es la política de cancelación?",
    answer:
      "Puedes cancelar o reprogramar tu cita hasta 24 horas antes sin costo alguno. Cancelaciones tardías pueden tener un cargo mínimo.",
  },
  {
    question: "¿Cada cuánto debo visitar al dentista?",
    answer:
      "Recomendamos visitas cada 6 meses para revisiones preventivas y limpiezas profesionales. Pacientes con tratamientos activos pueden necesitar visitas más frecuentes.",
  },
  {
    question: "¿Qué hago en una emergencia dental?",
    answer:
      "Contáctanos inmediatamente por WhatsApp o teléfono. Reservamos espacios para emergencias y te atenderemos lo antes posible.",
  },
  {
    question: "¿Ofrecen planes de pago o aceptan seguros?",
    answer:
      "Sí, ofrecemos planes de pago flexibles y trabajamos con las principales aseguradoras. Consulta con nosotros para más detalles.",
  },
];

export const footer = {
  services: [
    "Oclusodontia",
    "Estética Dental",
    "Ortodoncia",
    "Prótesis Dental",
    "Plan Nutricional",
  ],
  about: ["Certificados", "Educación"],
  terms: ["FAQ", "Política"],
  socials: [
    { label: "Facebook", href: "#" },
    { label: "LinkedIn", href: "#" },
    { label: "Instagram", href: "#" },
    { label: "Twitter", href: "#" },
  ],
  contact: {
    email: "agathajames@consultorio.com",
    phone: "+52 (555) 000-0000",
    address: "Av. Reforma 245, CDMX, México",
  },
};
