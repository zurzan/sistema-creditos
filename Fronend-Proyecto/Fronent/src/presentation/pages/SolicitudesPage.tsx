import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { listarSolicitudesUseCase } from "../../application/solicitudes/listar_solicitudes_usecase";
import { crearSolicitudUseCase } from "../../application/solicitudes/crear_solicitud_usecase";
import { eliminarSolicitudUseCase } from "../../application/solicitudes/eliminar_solicitud_usecase";
import { listarClientesUseCase } from "../../application/clientes/listar_clientes_usecase";
import { listarProductosUseCase } from "../../application/productos/listar_productos_usecase";
import type { Solicitud } from "../../domain/entities/solicitud";
import type { Cliente } from "../../domain/entities/cliente";
import type { Producto } from "../../domain/entities/producto";
import { Boton } from "../components/Boton";
import { Input } from "../components/Input";

export function SolicitudesPage() {
  const [solicitudes, setSolicitudes] = useState<Solicitud[]>([]);
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [productos, setProductos] = useState<Producto[]>([]);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState("");
  const [mostrarForm, setMostrarForm] = useState(false);

  const [clienteId, setClienteId] = useState("");
  const [productoId, setProductoId] = useState("");
  const [monto, setMonto] = useState("");
  const [plazo, setPlazo] = useState("");
  const [proposito, setProposito] = useState("");

  async function cargarTodo() {
    setCargando(true);
    setError("");
    try {
      const [sols, cls, prods] = await Promise.all([
        listarSolicitudesUseCase(),
        listarClientesUseCase(),
        listarProductosUseCase(),
      ]);
      setSolicitudes(sols);
      setClientes(cls);
      setProductos(prods);
    } catch (err: any) {
      setError("Error al cargar datos");
    } finally {
      setCargando(false);
    }
  }

  useEffect(() => {
    cargarTodo();
  }, []);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    try {
      await crearSolicitudUseCase({
        cliente_id: parseInt(clienteId),
        producto_id: parseInt(productoId),
        monto_solicitado: parseFloat(monto),
        plazo_meses: parseInt(plazo),
        proposito: proposito || undefined,
      });
      limpiarFormulario();
      setMostrarForm(false);
      cargarTodo();
    } catch (err: any) {
      setError(err.response?.data?.detail || "Error al crear solicitud");
    }
  }

  function limpiarFormulario() {
    setClienteId("");
    setProductoId("");
    setMonto("");
    setPlazo("");
    setProposito("");
  }

  async function handleEliminar(id: number) {
    if (!confirm("¿Eliminar esta solicitud?")) return;
    try {
      await eliminarSolicitudUseCase(id);
      cargarTodo();
    } catch (err: any) {
      setError("Error al eliminar solicitud");
    }
  }

  function colorEstado(estado: string) {
    const colores: Record<string, string> = {
      pendiente: "#f59e0b",
      en_evaluacion: "#3b82f6",
      aprobado: "#10b981",
      rechazado: "#ef4444",
      desembolsado: "#8b5cf6",
    };
    return colores[estado] || "#64748b";
  }

  return (
    <div>
      <div className="page-header">
        <h1>Solicitudes de Crédito</h1>
        <Boton onClick={() => setMostrarForm(!mostrarForm)}>
          {mostrarForm ? "Cancelar" : "Nueva solicitud"}
        </Boton>
      </div>

      {error && <div className="error-msg">{error}</div>}

      {mostrarForm && (
        <form className="form-card" onSubmit={handleSubmit}>
          <h3>Nueva Solicitud</h3>

          <div className="input-group">
            <label>Cliente</label>
            <select value={clienteId} onChange={(e) => setClienteId(e.target.value)} required>
              <option value="">-- Seleccionar --</option>
              {clientes.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.nombres} {c.apellidos} ({c.dni})
                </option>
              ))}
            </select>
          </div>

          <div className="input-group">
            <label>Producto de crédito</label>
            <select value={productoId} onChange={(e) => setProductoId(e.target.value)} required>
              <option value="">-- Seleccionar --</option>
              {productos.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.nombre} ({p.tasa_interes}%)
                </option>
              ))}
            </select>
          </div>

          <Input
            label="Monto solicitado"
            type="number"
            step="0.01"
            value={monto}
            onChange={(e) => setMonto(e.target.value)}
            required
          />
          <Input
            label="Plazo (meses)"
            type="number"
            value={plazo}
            onChange={(e) => setPlazo(e.target.value)}
            required
          />
          <Input label="Propósito" value={proposito} onChange={(e) => setProposito(e.target.value)} />

          <Boton type="submit">Guardar</Boton>
        </form>
      )}

      {cargando ? (
        <p>Cargando...</p>
      ) : solicitudes.length === 0 ? (
        <p>No hay solicitudes registradas.</p>
      ) : (
        <table className="tabla">
          <thead>
            <tr>
              <th>ID</th>
              <th>Cliente</th>
              <th>Producto</th>
              <th>Monto</th>
              <th>Plazo</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {solicitudes.map((s) => {
              const cliente = clientes.find((c) => c.id === s.cliente_id);
              const producto = productos.find((p) => p.id === s.producto_id);
              return (
                <tr key={s.id}>
                  <td>{s.id}</td>
                  <td>{cliente ? `${cliente.nombres} ${cliente.apellidos}` : s.cliente_id}</td>
                  <td>{producto ? producto.nombre : s.producto_id}</td>
                  <td>S/ {s.monto_solicitado.toFixed(2)}</td>
                  <td>{s.plazo_meses} meses</td>
                  <td>
                    <span
                      style={{
                        background: colorEstado(s.estado),
                        color: "white",
                        padding: "4px 10px",
                        borderRadius: "12px",
                        fontSize: 12,
                        textTransform: "capitalize",
                      }}
                    >
                      {s.estado}
                    </span>
                  </td>
                  <td>
                    <Boton variante="peligro" onClick={() => handleEliminar(s.id)}>
                      Eliminar
                    </Boton>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}