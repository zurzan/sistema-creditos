import type { Solicitud, SolicitudCreate } from "../entities/solicitud";

export interface SolicitudRepository {
  listar(): Promise<Solicitud[]>;
  obtener(id: number): Promise<Solicitud>;
  crear(datos: SolicitudCreate): Promise<Solicitud>;
  eliminar(id: number): Promise<void>;
}
