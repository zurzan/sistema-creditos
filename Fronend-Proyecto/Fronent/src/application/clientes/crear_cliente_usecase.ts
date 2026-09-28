import { ClienteRepositoryImpl } from "../../infrastructure/repositories/cliente_repository_impl";
import type { Cliente, ClienteCreate } from "../../domain/entities/cliente";

const clienteRepository = new ClienteRepositoryImpl();

export async function crearClienteUseCase(
  datos: ClienteCreate,
): Promise<Cliente> {
  return await clienteRepository.crear(datos);
}
