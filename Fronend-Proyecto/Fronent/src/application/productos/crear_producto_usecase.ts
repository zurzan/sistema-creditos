import { ProductoRepositoryImpl } from "../../infrastructure/repositories/producto_repository_impl";
import type { Producto, ProductoCreate } from "../../domain/entities/producto";

const productoRepository = new ProductoRepositoryImpl();

export async function crearProductoUseCase(
  datos: ProductoCreate,
): Promise<Producto> {
  return await productoRepository.crear(datos);
}
