import { ProductoRepositoryImpl } from "../../infrastructure/repositories/producto_repository_impl";

const productoRepository = new ProductoRepositoryImpl();

export async function eliminarProductoUseCase(id: number): Promise<void> {
  await productoRepository.eliminar(id);
}
