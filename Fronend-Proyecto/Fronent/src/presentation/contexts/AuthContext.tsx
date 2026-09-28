import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import { tokenStorage } from "../../infrastructure/storage/token_storage";
import { loginUseCase } from "../../application/auth/login_usecase";
import { logoutUseCase } from "../../application/auth/logout_usecase";

interface AuthContextType {
  token: string | null;
  usuario: any | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  estaAutenticado: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(tokenStorage.obtener());
  const [usuario, setUsuario] = useState<any | null>(tokenStorage.obtenerUsuario());

  async function login(username: string, password: string) {
    const data = await loginUseCase(username, password);
    setToken(data.access_token);
  }

  function logout() {
    logoutUseCase();
    setToken(null);
    setUsuario(null);
  }

  return (
    <AuthContext.Provider
      value={{
        token,
        usuario,
        login,
        logout,
        estaAutenticado: !!token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe usarse dentro de AuthProvider");
  }
  return context;
}