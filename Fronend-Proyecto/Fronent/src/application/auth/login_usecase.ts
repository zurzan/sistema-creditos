import { AuthRepositoryImpl } from "../../infrastructure/repositories/auth_repository_impl";
import { tokenStorage } from "../../infrastructure/storage/token_storage";
import type { Token } from "../../domain/entities/usuario";

const authRepository = new AuthRepositoryImpl();

export async function loginUseCase(
  username: string,
  password: string,
): Promise<Token> {
  const token = await authRepository.login(username, password);
  tokenStorage.guardar(token.access_token);
  return token;
}
