import { EvaluacionRepositoryImpl } from "../../infrastructure/repositories/evaluacion_repository_impl";
import type {
  Evaluacion,
  EvaluacionCreate,
} from "../../domain/entities/evaluacion";

const evaluacionRepository = new EvaluacionRepositoryImpl();

export async function evaluarSolicitudUseCase(
  solicitudId: number,
  datos: EvaluacionCreate,
): Promise<Evaluacion> {
  return await evaluacionRepository.evaluar(solicitudId, datos);
}
