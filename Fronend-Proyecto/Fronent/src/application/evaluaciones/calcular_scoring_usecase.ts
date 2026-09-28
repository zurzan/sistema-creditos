import { EvaluacionRepositoryImpl } from "../../infrastructure/repositories/evaluacion_repository_impl";
import type { Scoring } from "../../domain/entities/scoring";
import type { InformacionFinancieraCreate } from "../../domain/entities/informacion_financiera";

const evaluacionRepository = new EvaluacionRepositoryImpl();

export async function calcularScoringUseCase(
  solicitudId: number,
  info: InformacionFinancieraCreate,
): Promise<Scoring> {
  return await evaluacionRepository.calcularScoring(solicitudId, info);
}
