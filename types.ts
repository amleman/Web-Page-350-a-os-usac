export interface Interacciones {
  likes: number;
  alumnos: number;
}

export interface Rector {
  id: string;
  nombre: string;
  periodo: string;
  descripcion_corta: string;
  cita: string;
  biografia_completa: string; // Added field for the 'View full bio' feature
  foto_url: string;
  fondo_url: string; // Added for the background image
  interacciones: Interacciones;
}