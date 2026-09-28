export interface Cliente {
  id: number;
  dni: string;
  nombres: string;
  apellidos: string;
  fecha_nacimiento: string;
  telefono: string | null;
  email: string | null;
  direccion: string | null;
  ingresos_mensuales: number;
  activo: boolean;
}

export interface ClienteCreate {
  dni: string;
  nombres: string;
  apellidos: string;
  fecha_nacimiento: string;
  telefono?: string;
  email?: string;
  direccion?: string;
  ingresos_mensuales: number;
}

export interface ClienteUpdate {
  nombres?: string;
  apellidos?: string;
  telefono?: string;
  email?: string;
  direccion?: string;
  ingresos_mensuales?: number;
}
