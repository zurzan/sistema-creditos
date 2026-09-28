import { axiosClient } from "../api/axios_client";
import type { ClienteRepository } from "../../domain/repositories/cliente_repository";
import type {
  Cliente,
  ClienteCreate,
  ClienteUpdate,
} from "../../domain/entities/cliente";

export class ClienteRepositoryImpl implements ClienteRepository {
  async listar(): Promise<Cliente[]> {
    const response = await axiosClient.get<Cliente[]>("/clientes/");
    return response.data;
  }

  async obtener(id: number): Promise<Cliente> {
    const response = await axiosClient.get<Cliente>(`/clientes/${id}`);
    return response.data;
  }

  async crear(datos: ClienteCreate): Promise<Cliente> {
    const response = await axiosClient.post<Cliente>("/clientes/", datos);
    return response.data;
  }

  async actualizar(id: number, datos: ClienteUpdate): Promise<Cliente> {
    const response = await axiosClient.put<Cliente>(`/clientes/${id}`, datos);
    return response.data;
  }

  async eliminar(id: number): Promise<void> {
    await axiosClient.delete(`/clientes/${id}`);
  }
}
