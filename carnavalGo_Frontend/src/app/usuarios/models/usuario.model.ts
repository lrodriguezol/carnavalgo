export interface Usuario {
    id?: number;
    nombre: string;
    apellido1: string;
    apellido2?: string;
    email: string;
    telefono?: string;
    username: string;
    password: string;
    rol: 'AFICIONADO' | 'POSTULANTE' | 'ADMINISTRADOR';
  }
  