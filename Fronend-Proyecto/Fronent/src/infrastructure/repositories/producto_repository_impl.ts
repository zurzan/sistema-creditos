import { axiosClient } from "../api/axios_client";
import type { ProductoRepository } from "../../domain/repositories/producto_repository";
import type { Producto, ProductoCreate } from "../../domain/entities/producto";

export class ProductoRepositoryImpl implements ProductoRepository {
  async listar(): Promise<Producto[]> {
    const response = await axiosClient.get<Producto[]>("/productos/");
    return response.data;
  }

  async obtener(id: number): Promise<Producto> {
    const response = await axiosClient.get<Producto>(`/productos/${id}`);
    return response.data;
  }

  async crear(datos: ProductoCreate): Promise<Producto> {
    const response = await axiosClient.post<Producto>("/productos/", datos);
    return response.data;
  }

  async eliminar(id: number): Promise<void> {
    await axiosClient.delete(`/productos/${id}`);
  }
}
