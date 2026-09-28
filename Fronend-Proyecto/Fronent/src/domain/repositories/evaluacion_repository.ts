import type { Evaluacion, EvaluacionCreate } from "../entities/evaluacion";
import type { Scoring } from "../entities/scoring";
import type {
  Verificacion,
  VerificacionCreate,
} from "../entities/verificacion";
import type { InformacionFinancieraCreate } from "../entities/informacion_financiera";

export interface EvaluacionRepository {
  listar(): Promise<Evaluacion[]>;
  calcularScoring(
    solicitudId: number,
    info: InformacionFinancieraCreate,
  ): Promise<Scoring>;
  consultarCentral(
    solicitudId: number,
    datos: VerificacionCreate,
  ): Promise<Verificacion>;
  evaluar(solicitudId: number, datos: EvaluacionCreate): Promise<Evaluacion>;
}
