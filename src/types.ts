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
  trayectoria_academica: string;
  logros_gestion: string;
  foto_url: string;
  video_url?: string;
  fondo_url: string;
  audio_url?: string;
  interacciones: Interacciones;

}