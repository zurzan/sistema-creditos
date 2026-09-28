import { EvaluacionRepositoryImpl } from "../../infrastructure/repositories/evaluacion_repository_impl";
import type {
  Verificacion,
  VerificacionCreate,
} from "../../domain/entities/verificacion";

const evaluacionRepository = new EvaluacionRepositoryImpl();

export async function consultarCentralUseCase(
  solicitudId: number,
  datos: VerificacionCreate,
): Promise<Verificacion> {
  return await evaluacionRepository.consultarCentral(solicitudId, datos);
}
