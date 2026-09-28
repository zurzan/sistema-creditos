import { SolicitudRepositoryImpl } from "../../infrastructure/repositories/solicitud_repository_impl";
import type {
  Solicitud,
  SolicitudCreate,
} from "../../domain/entities/solicitud";

const solicitudRepository = new SolicitudRepositoryImpl();

export async function crearSolicitudUseCase(
  datos: SolicitudCreate,
): Promise<Solicitud> {
  return await solicitudRepository.crear(datos);
}
