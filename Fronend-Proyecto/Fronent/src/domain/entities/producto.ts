export type TipoCredito =
  | "personal"
  | "hipotecario"
  | "vehicular"
  | "empresarial"
  | "microcredito";

export interface Producto {
  id: number;
  nombre: string;
  tipo: TipoCredito;
  tasa_interes: number;
  monto_minimo: number;
  monto_maximo: number;
  plazo_maximo_meses: number;
  descripcion: string | null;
  activo: boolean;
}

export interface ProductoCreate {
  nombre: string;
  tipo: TipoCredito;
  tasa_interes: number;
  monto_minimo: number;
  monto_maximo: number;
  plazo_maximo_meses: number;
  descripcion?: string;
}
