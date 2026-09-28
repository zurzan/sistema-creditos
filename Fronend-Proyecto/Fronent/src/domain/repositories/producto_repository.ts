import type { Producto, ProductoCreate } from "../entities/producto";

export interface ProductoRepository {
  listar(): Promise<Producto[]>;
  obtener(id: number): Promise<Producto>;
  crear(datos: ProductoCreate): Promise<Producto>;
  eliminar(id: number): Promise<void>;
}
