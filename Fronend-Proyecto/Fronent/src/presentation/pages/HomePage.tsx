import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export function HomePage() {
  const { usuario } = useAuth();

  return (
    <div>
      <div className="page-header">
        <h1>Bienvenido al Sistema de Créditos</h1>
      </div>

      <div className="form-card">
        <h3>Panel principal</h3>
        <p style={{ marginTop: 8, color: "#64748b" }}>
          {usuario
            ? `Hola, ${usuario.nombre_completo || usuario.username}. Selecciona una opción del menú para comenzar.`
            : "Selecciona una opción del menú para comenzar a trabajar con el sistema."}
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: 16,
        }}
      >
        <Link to="/clientes" style={{ textDecoration: "none" }}>
          <div className="form-card" style={{ cursor: "pointer" }}>
            <h3>Clientes</h3>
            <p style={{ color: "#64748b", marginTop: 8 }}>
              Gestiona los clientes registrados
            </p>
          </div>
        </Link>

        <Link to="/productos" style={{ textDecoration: "none" }}>
          <div className="form-card" style={{ cursor: "pointer" }}>
            <h3>Productos</h3>
            <p style={{ color: "#64748b", marginTop: 8 }}>
              Administra los productos de crédito
            </p>
          </div>
        </Link>

        <Link to="/solicitudes" style={{ textDecoration: "none" }}>
          <div className="form-card" style={{ cursor: "pointer" }}>
            <h3>Solicitudes</h3>
            <p style={{ color: "#64748b", marginTop: 8 }}>
              Revisa las solicitudes de crédito
            </p>
          </div>
        </Link>

        <Link to="/evaluaciones" style={{ textDecoration: "none" }}>
          <div className="form-card" style={{ cursor: "pointer" }}>
            <h3>Evaluaciones</h3>
            <p style={{ color: "#64748b", marginTop: 8 }}>
              Calcula scoring y evalúa solicitudes
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
}