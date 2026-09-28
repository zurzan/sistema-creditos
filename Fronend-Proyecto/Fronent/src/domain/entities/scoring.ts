export type NivelRiesgo = "muy_bajo" | "bajo" | "medio" | "alto" | "muy_alto";

export interface Scoring {
  id: number;
  solicitud_id: number;
  puntaje: number;
  nivel_riesgo: NivelRiesgo;
  capacidad_pago: number;
  ratio_deuda_ingreso: number;
  observaciones: string | null;
}
