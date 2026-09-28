import { ClienteRepositoryImpl } from "../../infrastructure/repositories/cliente_repository_impl";

const clienteRepository = new ClienteRepositoryImpl();

export async function eliminarClienteUseCase(id: number): Promise<void> {
  await clienteRepository.eliminar(id);
}
