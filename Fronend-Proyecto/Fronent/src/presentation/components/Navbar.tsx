import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export function Navbar() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <nav className="navbar">
      <div className="navbar-brand">Sistema de Créditos</div>
      <div className="navbar-links">
        <Link to="/">Inicio</Link>
        <Link to="/clientes">Clientes</Link>
        <Link to="/productos">Productos</Link>
        <Link to="/solicitudes">Solicitudes</Link>
        <Link to="/evaluaciones">Evaluaciones</Link>
      </div>
      <button className="boton boton-peligro" onClick={handleLogout}>
        Salir
      </button>
    </nav>
  );
}