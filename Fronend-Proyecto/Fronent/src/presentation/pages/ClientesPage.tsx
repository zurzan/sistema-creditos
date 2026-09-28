import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { listarClientesUseCase } from "../../application/clientes/listar_clientes_usecase";
import { crearClienteUseCase } from "../../application/clientes/crear_cliente_usecase";
import { eliminarClienteUseCase } from "../../application/clientes/eliminar_cliente_usecase";
import type { Cliente } from "../../domain/entities/cliente";
import { Boton } from "../components/Boton";
import { Input } from "../components/Input";

export function ClientesPage() {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState("");
  const [mostrarForm, setMostrarForm] = useState(false);

  const [dni, setDni] = useState("");
  const [nombres, setNombres] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [telefono, setTelefono] = useState("");
  const [email, setEmail] = useState("");
  const [direccion, setDireccion] = useState("");
  const [ingresos, setIngresos] = useState("");

  async function cargarClientes() {
    setCargando(true);
    setError("");
    try {
      const data = await listarClientesUseCase();
      setClientes(data);
    } catch (err: any) {
      setError("Error al cargar clientes");
    } finally {
      setCargando(false);
    }
  }

  useEffect(() => {
    cargarClientes();
  }, []);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    try {
      await crearClienteUseCase({
        dni,
        nombres,
        apellidos,
        fecha_nacimiento: fechaNacimiento,
        telefono: telefono || undefined,
        email: email || undefined,
        direccion: direccion || undefined,
        ingresos_mensuales: parseFloat(ingresos),
      });
      limpiarFormulario();
      setMostrarForm(false);
      cargarClientes();
    } catch (err: any) {
      setError(err.response?.data?.detail || "Error al crear cliente");
    }
  }

  function limpiarFormulario() {
    setDni("");
    setNombres("");
    setApellidos("");
    setFechaNacimiento("");
    setTelefono("");
    setEmail("");
    setDireccion("");
    setIngresos("");
  }

  async function handleEliminar(id: number) {
    if (!confirm("¿Eliminar este cliente?")) return;
    try {
      await eliminarClienteUseCase(id);
      cargarClientes();
    } catch (err: any) {
      setError("Error al eliminar cliente");
    }
  }

  return (
    <div>
      <div className="page-header">
        <h1>Clientes</h1>
        <Boton onClick={() => setMostrarForm(!mostrarForm)}>
          {mostrarForm ? "Cancelar" : "Nuevo cliente"}
        </Boton>
      </div>

      {error && <div className="error-msg">{error}</div>}

      {mostrarForm && (
        <form className="form-card" onSubmit={handleSubmit}>
          <h3>Nuevo Cliente</h3>

          <Input label="DNI" value={dni} onChange={(e) => setDni(e.target.value)} required />
          <Input label="Nombres" value={nombres} onChange={(e) => setNombres(e.target.value)} required />
          <Input label="Apellidos" value={apellidos} onChange={(e) => setApellidos(e.target.value)} required />
          <Input
            label="Fecha de nacimiento"
            type="date"
            value={fechaNacimiento}
            onChange={(e) => setFechaNacimiento(e.target.value)}
            required
          />
          <Input label="Teléfono" value={telefono} onChange={(e) => setTelefono(e.target.value)} />
          <Input label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <Input label="Dirección" value={direccion} onChange={(e) => setDireccion(e.target.value)} />
          <Input
            label="Ingresos mensuales"
            type="number"
            step="0.01"
            value={ingresos}
            onChange={(e) => setIngresos(e.target.value)}
            required
          />

          <Boton type="submit">Guardar</Boton>
        </form>
      )}

      {cargando ? (
        <p>Cargando...</p>
      ) : clientes.length === 0 ? (
        <p>No hay clientes registrados.</p>
      ) : (
        <table className="tabla">
          <thead>
            <tr>
              <th>ID</th>
              <th>DNI</th>
              <th>Nombres</th>
              <th>Apellidos</th>
              <th>Ingresos</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {clientes.map((c) => (
              <tr key={c.id}>
                <td>{c.id}</td>
                <td>{c.dni}</td>
                <td>{c.nombres}</td>
                <td>{c.apellidos}</td>
                <td>S/ {c.ingresos_mensuales.toFixed(2)}</td>
                <td>
                  <Boton variante="peligro" onClick={() => handleEliminar(c.id)}>
                    Eliminar
                  </Boton>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}