import { ProductoRepositoryImpl } from "../../infrastructure/repositories/producto_repository_impl";
import type { Producto } from "../../domain/entities/producto";

const productoRepository = new ProductoRepositoryImpl();

export async function listarProductosUseCase(): Promise<Producto[]> {
  return await productoRepository.listar();
}
