import { AuthRepositoryImpl } from "../../infrastructure/repositories/auth_repository_impl";
import type { Usuario, UsuarioCreate } from "../../domain/entities/usuario";

const authRepository = new AuthRepositoryImpl();

export async function registrarUseCase(datos: UsuarioCreate): Promise<Usuario> {
  return await authRepository.registrar(datos);
}
