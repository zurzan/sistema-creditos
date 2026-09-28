export type EstadoSolicitud =
  | "pendiente"
  | "en_evaluacion"
  | "aprobado"
  | "rechazado"
  | "desembolsado";

export interface Solicitud {
  id: number;
  cliente_id: number;
  producto_id: number;
  monto_solicitado: number;
  plazo_meses: number;
  proposito: string | null;
  estado: EstadoSolicitud;
  fecha_solicitud: string;
}

export interface SolicitudCreate {
  cliente_id: number;
  producto_id: number;
  monto_solicitado: number;
  plazo_meses: number;
  proposito?: string;
}
