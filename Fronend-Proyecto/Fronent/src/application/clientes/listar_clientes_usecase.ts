import { ClienteRepositoryImpl } from "../../infrastructure/repositories/cliente_repository_impl";
import type { Cliente } from "../../domain/entities/cliente";

const clienteRepository = new ClienteRepositoryImpl();

export async function listarClientesUseCase(): Promise<Cliente[]> {
  return await clienteRepository.listar();
}
