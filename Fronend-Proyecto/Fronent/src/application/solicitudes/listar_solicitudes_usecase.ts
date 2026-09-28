import { SolicitudRepositoryImpl } from "../../infrastructure/repositories/solicitud_repository_impl";
import type { Solicitud } from "../../domain/entities/solicitud";

const solicitudRepository = new SolicitudRepositoryImpl();

export async function listarSolicitudesUseCase(): Promise<Solicitud[]> {
  return await solicitudRepository.listar();
}
