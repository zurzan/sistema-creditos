import { SolicitudRepositoryImpl } from "../../infrastructure/repositories/solicitud_repository_impl";

const solicitudRepository = new SolicitudRepositoryImpl();

export async function eliminarSolicitudUseCase(id: number): Promise<void> {
  await solicitudRepository.eliminar(id);
}
