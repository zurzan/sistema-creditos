export type DecisionEvaluacion = "aprobado" | "rechazado";

export interface Evaluacion {
  id: number;
  solicitud_id: number;
  analista_id: number;
  decision: DecisionEvaluacion;
  monto_aprobado: number | null;
  tasa_final: number | null;
  motivo: string | null;
}

export interface EvaluacionCreate {
  decision: DecisionEvaluacion;
  monto_aprobado?: number;
  tasa_final?: number;
  motivo?: string;
}
