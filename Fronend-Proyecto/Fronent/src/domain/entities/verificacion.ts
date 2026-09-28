export interface Verificacion {
  id: number;
  solicitud_id: number;
  central: string;
  tiene_moras: boolean;
  tiene_judicial: boolean;
  calificacion: string;
  deuda_total: number;
  observaciones: string | null;
}

export interface VerificacionCreate {
  central: string;
}
