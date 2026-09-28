import type { Usuario, UsuarioCreate, Token } from "../entities/usuario";

export interface AuthRepository {
  registrar(datos: UsuarioCreate): Promise<Usuario>;
  login(username: string, password: string): Promise<Token>;
}
