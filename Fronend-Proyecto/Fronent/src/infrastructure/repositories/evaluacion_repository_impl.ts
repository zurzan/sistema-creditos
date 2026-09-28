import { axiosClient } from "../api/axios_client";
import type { EvaluacionRepository } from "../../domain/repositories/evaluacion_repository";
import type {
  Evaluacion,
  EvaluacionCreate,
} from "../../domain/entities/evaluacion";
import type { Scoring } from "../../domain/entities/scoring";
import type {
  Verificacion,
  VerificacionCreate,
} from "../../domain/entities/verificacion";
import type { InformacionFinancieraCreate } from "../../domain/entities/informacion_financiera";

export class EvaluacionRepositoryImpl implements EvaluacionRepository {
  async listar(): Promise<Evaluacion[]> {
    const response = await axiosClient.get<Evaluacion[]>("/evaluaciones/");
    return response.data;
  }

  async calcularScoring(
    solicitudId: number,
    info: InformacionFinancieraCreate,
  ): Promise<Scoring> {
    const response = await axiosClient.post<Scoring>(
      `/evaluaciones/${solicitudId}/scoring`,
      info,
    );
    return response.data;
  }

  async consultarCentral(
    solicitudId: number,
    datos: VerificacionCreate,
  ): Promise<Verificacion> {
    const response = await axiosClient.post<Verificacion>(
      `/evaluaciones/${solicitudId}/verificacion`,
      datos,
    );
    return response.data;
  }

  async evaluar(
    solicitudId: number,
    datos: EvaluacionCreate,
  ): Promise<Evaluacion> {
    const response = await axiosClient.post<Evaluacion>(
      `/evaluaciones/${solicitudId}/evaluar`,
      datos,
    );
    return response.data;
  }
}
