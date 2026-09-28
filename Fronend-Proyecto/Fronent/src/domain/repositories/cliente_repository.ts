import type {
  Cliente,
  ClienteCreate,
  ClienteUpdate,
} from "../entities/cliente";

export interface ClienteRepository {
  listar(): Promise<Cliente[]>;
  obtener(id: number): Promise<Cliente>;
  crear(datos: ClienteCreate): Promise<Cliente>;
  actualizar(id: number, datos: ClienteUpdate): Promise<Cliente>;
  eliminar(id: number): Promise<void>;
}
