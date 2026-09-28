export interface InformacionFinanciera {
  id: number;
  solicitud_id: number;
  ingresos_mensuales: number;
  gastos_mensuales: number;
  patrimonio: number;
  deudas_actuales: number;
  años_experiencia_laboral: number;
  tipo_empleo: string | null;
}

export interface InformacionFinancieraCreate {
  ingresos_mensuales: number;
  gastos_mensuales: number;
  patrimonio?: number;
  deudas_actuales?: number;
  años_experiencia_laboral?: number;
  tipo_empleo?: string;
}
