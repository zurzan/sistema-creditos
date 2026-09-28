const TOKEN_KEY = "auth_token";
const USER_KEY = "auth_user";

export const tokenStorage = {
  guardar(token: string) {
    localStorage.setItem(TOKEN_KEY, token);
  },

  obtener(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  },

  eliminar() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  },

  guardarUsuario(usuario: object) {
    localStorage.setItem(USER_KEY, JSON.stringify(usuario));
  },

  obtenerUsuario(): any | null {
    const data = localStorage.getItem(USER_KEY);
    return data ? JSON.parse(data) : null;
  },
};
