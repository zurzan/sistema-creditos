export type RolUsuario = "admin" | "analista" | "cliente";

export interface Usuario {
  id: number;
  username: string;
  nombre_completo: string;
  email: string | null;
  rol: RolUsuario;
  activo: boolean;
}

export interface UsuarioCreate {
  username: string;
  password: string;
  nombre_completo: string;
  email?: string;
  rol?: RolUsuario;
}

export interface Token {
  access_token: string;
  token_type: string;
}
