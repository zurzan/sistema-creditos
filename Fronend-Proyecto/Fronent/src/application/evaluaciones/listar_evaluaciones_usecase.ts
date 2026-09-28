import { EvaluacionRepositoryImpl } from "../../infrastructure/repositories/evaluacion_repository_impl";
import type { Evaluacion } from "../../domain/entities/evaluacion";

const evaluacionRepository = new EvaluacionRepositoryImpl();

export async function listarEvaluacionesUseCase(): Promise<Evaluacion[]> {
  return await evaluacionRepository.listar();
}
