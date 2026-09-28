import { axiosClient } from "../api/axios_client";
import type { SolicitudRepository } from "../../domain/repositories/solicitud_repository";
import type {
  Solicitud,
  SolicitudCreate,
} from "../../domain/entities/solicitud";

export class SolicitudRepositoryImpl implements SolicitudRepository {
  async listar(): Promise<Solicitud[]> {
    const response = await axiosClient.get<Solicitud[]>("/solicitudes/");
    return response.data;
  }

  async obtener(id: number): Promise<Solicitud> {
    const response = await axiosClient.get<Solicitud>(`/solicitudes/${id}`);
    return response.data;
  }

  async crear(datos: SolicitudCreate): Promise<Solicitud> {
    const response = await axiosClient.post<Solicitud>("/solicitudes/", datos);
    return response.data;
  }

  async eliminar(id: number): Promise<void> {
    await axiosClient.delete(`/solicitudes/${id}`);
  }
}
