import { axiosClient } from "../api/axios_client";
import type { AuthRepository } from "../../domain/repositories/auth_repository";
import type {
  Usuario,
  UsuarioCreate,
  Token,
} from "../../domain/entities/usuario";

export class AuthRepositoryImpl implements AuthRepository {
  async registrar(datos: UsuarioCreate): Promise<Usuario> {
    const response = await axiosClient.post<Usuario>("/auth/registro", datos);
    return response.data;
  }

  async login(username: string, password: string): Promise<Token> {
    const formData = new URLSearchParams();
    formData.append("username", username);
    formData.append("password", password);

    const response = await axiosClient.post<Token>("/auth/login", formData, {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });
    return response.data;
  }
}
