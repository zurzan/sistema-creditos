import { useState } from "react";
import type { FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registrarUseCase } from "../../application/auth/registrar_usecase";
import { Boton } from "../components/Boton";
import { Input } from "../components/Input";

export function RegistroPage() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [nombre_completo, setNombreCompleto] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [exito, setExito] = useState("");
  const [cargando, setCargando] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setExito("");
    setCargando(true);

    try {
      await registrarUseCase({
        username,
        password,
        nombre_completo,
        email: email || undefined,
      });
      setExito("Usuario registrado correctamente. Redirigiendo...");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err: any) {
      if (err.response?.status === 400) {
        setError("El usuario ya existe. Prueba con otro nombre.");
      } else {
        setError("Error al registrarse. Verifica los datos.");
      }
    } finally {
      setCargando(false);
    }
  }

  return (
    <div className="pantalla-auth">
      <form className="card-auth" onSubmit={handleSubmit}>
        <h2>Crear Cuenta</h2>

        {error && <div className="error-msg">{error}</div>}
        {exito && <div className="success-msg">{exito}</div>}

        <Input
          label="Usuario"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          minLength={3}
        />

        <Input
          label="Nombre completo"
          type="text"
          value={nombre_completo}
          onChange={(e) => setNombreCompleto(e.target.value)}
          required
          minLength={3}
        />

        <Input
          label="Email (opcional)"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Input
          label="Contraseña"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={6}
        />

        <Boton type="submit" disabled={cargando} style={{ width: "100%" }}>
          {cargando ? "Registrando..." : "Registrarme"}
        </Boton>

        <p style={{ marginTop: 16, textAlign: "center", fontSize: 14 }}>
          ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
        </p>
      </form>
    </div>
  );
}