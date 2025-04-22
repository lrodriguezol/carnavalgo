export interface Evento {
    id?: number;
    titulo: string;
    fecha: string; // 'YYYY-MM-DD'
    hora?: string; // 'HH:mm:ss'
    localizacion?: string;
    agrupacion?: number | null;
    creado_por?: number;
  }