import { Rector } from './types';

// Helper para reciclar fondos (1-5)
// Rector 1 -> Fondo 1, Rector 6 -> Fondo 1, etc.
const getFondo = (index: number) => `/images/fondo_${(index % 5) + 1}.jpg`;

export const RECTORES: Rector[] = [
  {
    id: "rector_1",
    nombre: "Rector Histórico I",
    periodo: "Periodo I",
    descripcion_corta: "Registro histórico de la administración universitaria.",
    cita: "El legado universitario perdura a través del tiempo.",
    biografia_completa: "Información biográfica pendiente de actualización. Este espacio está reservado para la historia y logros de este rector durante su gestión en la Tricentenaria Universidad de San Carlos de Guatemala.",
    foto_url: "/images/rector_1.jpeg",
    fondo_url: getFondo(0),
    interacciones: { likes: 120, alumnos: 450 }
  },
  {
    id: "rector_2",
    nombre: "Rector Histórico II",
    periodo: "Periodo II",
    descripcion_corta: "Contribución al desarrollo académico de la institución.",
    cita: "La excelencia académica es nuestro norte.",
    biografia_completa: "Información biográfica pendiente de actualización. Este espacio está reservado para la historia y logros de este rector durante su gestión en la Tricentenaria Universidad de San Carlos de Guatemala.",
    foto_url: "/images/rector_2.jpeg",
    fondo_url: getFondo(1),
    interacciones: { likes: 145, alumnos: 520 }
  },
  {
    id: "rector_3",
    nombre: "Rector Histórico III",
    periodo: "Periodo III",
    descripcion_corta: "Fortalecimiento de la autonomía universitaria.",
    cita: "Id y enseñad a todos.",
    biografia_completa: "Información biográfica pendiente de actualización. Este espacio está reservado para la historia y logros de este rector durante su gestión en la Tricentenaria Universidad de San Carlos de Guatemala.",
    foto_url: "/images/rector_3.jpeg",
    fondo_url: getFondo(2),
    interacciones: { likes: 98, alumnos: 300 }
  },
  {
    id: "rector_4",
    nombre: "Rector Histórico IV",
    periodo: "Periodo IV",
    descripcion_corta: "Innovación y reforma educativa.",
    cita: "La cultura es el motor del cambio.",
    biografia_completa: "Información biográfica pendiente de actualización. Este espacio está reservado para la historia y logros de este rector durante su gestión en la Tricentenaria Universidad de San Carlos de Guatemala.",
    foto_url: "/images/rector_4.jpeg",
    fondo_url: "/images/fondo_6.jpg",
    interacciones: { likes: 210, alumnos: 890 }
  },
  {
    id: "rector_5",
    nombre: "Rector Histórico V",
    periodo: "Periodo V",
    descripcion_corta: "Expansión de la cobertura universitaria.",
    cita: "Educación superior para todos.",
    biografia_completa: "Información biográfica pendiente de actualización. Este espacio está reservado para la historia y logros de este rector durante su gestión en la Tricentenaria Universidad de San Carlos de Guatemala.",
    foto_url: "/images/rector_5.jpeg",
    fondo_url: getFondo(4),
    interacciones: { likes: 175, alumnos: 600 }
  },
  {
    id: "rector_6",
    nombre: "Rector Histórico VI",
    periodo: "Periodo VI",
    descripcion_corta: "Defensa de los valores universitarios.",
    cita: "Compromiso con la verdad y la justicia.",
    biografia_completa: "Información biográfica pendiente de actualización. Este espacio está reservado para la historia y logros de este rector durante su gestión en la Tricentenaria Universidad de San Carlos de Guatemala.",
    foto_url: "/images/rector_6.jpeg",
    fondo_url: getFondo(5), // Reusa fondo 1
    interacciones: { likes: 130, alumnos: 410 }
  },
  {
    id: "rector_7",
    nombre: "Rector Histórico VII",
    periodo: "Periodo VII",
    descripcion_corta: "Modernización de la infraestructura.",
    cita: "Construyendo el futuro de la nación.",
    biografia_completa: "Información biográfica pendiente de actualización. Este espacio está reservado para la historia y logros de este rector durante su gestión en la Tricentenaria Universidad de San Carlos de Guatemala.",
    foto_url: "/images/rector_7.jpeg",
    fondo_url: getFondo(6), // Reusa fondo 2
    interacciones: { likes: 190, alumnos: 750 }
  },
  {
    id: "rector_8",
    nombre: "Rector Histórico VIII",
    periodo: "Periodo VIII",
    descripcion_corta: "Promoción de la investigación científica.",
    cita: "La ciencia al servicio de la humanidad.",
    biografia_completa: "Información biográfica pendiente de actualización. Este espacio está reservado para la historia y logros de este rector durante su gestión en la Tricentenaria Universidad de San Carlos de Guatemala.",
    foto_url: "/images/rector_8.jpeg",
    fondo_url: getFondo(7), // Reusa fondo 3
    interacciones: { likes: 160, alumnos: 580 }
  },
  {
    id: "rector_9",
    nombre: "Rector Histórico IX",
    periodo: "Periodo IX",
    descripcion_corta: "Vinculación universidad-sociedad.",
    cita: "Unidad en la diversidad.",
    biografia_completa: "Información biográfica pendiente de actualización. Este espacio está reservado para la historia y logros de este rector durante su gestión en la Tricentenaria Universidad de San Carlos de Guatemala.",
    foto_url: "/images/rector_9.jpeg",
    fondo_url: "/images/fondo_4.jpeg", // Reusa fondo 4
    interacciones: { likes: 220, alumnos: 920 }
  }
];