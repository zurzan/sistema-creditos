import { SolicitudRepositoryImpl } from "../../infrastructure/repositories/solicitud_repository_impl";
import type { Solicitud } from "../../domain/entities/solicitud";

const solicitudRepository = new SolicitudRepositoryImpl();

export async function obtenerSolicitudUseCase(id: number): Promise<Solicitud> {
  return await solicitudRepository.obtener(id);
}
