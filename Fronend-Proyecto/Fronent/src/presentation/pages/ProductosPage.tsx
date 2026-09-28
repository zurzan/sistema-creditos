import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { listarProductosUseCase } from "../../application/productos/listar_productos_usecase";
import { crearProductoUseCase } from "../../application/productos/crear_producto_usecase";
import { eliminarProductoUseCase } from "../../application/productos/eliminar_producto_usecase";
import type { Producto } from "../../domain/entities/producto";
import { Boton } from "../components/Boton";
import { Input } from "../components/Input";

export function ProductosPage() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState("");
  const [mostrarForm, setMostrarForm] = useState(false);

  const [nombre, setNombre] = useState("");
  const [tipo, setTipo] = useState("personal");
  const [tasa, setTasa] = useState("");
  const [montoMin, setMontoMin] = useState("");
  const [montoMax, setMontoMax] = useState("");
  const [plazoMax, setPlazoMax] = useState("");
  const [descripcion, setDescripcion] = useState("");

  async function cargarProductos() {
    setCargando(true);
    setError("");
    try {
      const data = await listarProductosUseCase();
      setProductos(data);
    } catch (err: any) {
      setError("Error al cargar productos");
    } finally {
      setCargando(false);
    }
  }

  useEffect(() => {
    cargarProductos();
  }, []);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    try {
      await crearProductoUseCase({
        nombre,
        tipo: tipo as any,
        tasa_interes: parseFloat(tasa),
        monto_minimo: parseFloat(montoMin),
        monto_maximo: parseFloat(montoMax),
        plazo_maximo_meses: parseInt(plazoMax),
        descripcion: descripcion || undefined,
      });
      limpiarFormulario();
      setMostrarForm(false);
      cargarProductos();
    } catch (err: any) {
      setError(err.response?.data?.detail || "Error al crear producto");
    }
  }

  function limpiarFormulario() {
    setNombre("");
    setTipo("personal");
    setTasa("");
    setMontoMin("");
    setMontoMax("");
    setPlazoMax("");
    setDescripcion("");
  }

  async function handleEliminar(id: number) {
    if (!confirm("¿Eliminar este producto?")) return;
    try {
      await eliminarProductoUseCase(id);
      cargarProductos();
    } catch (err: any) {
      setError("Error al eliminar producto");
    }
  }

  return (
    <div>
      <div className="page-header">
        <h1>Productos de Crédito</h1>
        <Boton onClick={() => setMostrarForm(!mostrarForm)}>
          {mostrarForm ? "Cancelar" : "Nuevo producto"}
        </Boton>
      </div>

      {error && <div className="error-msg">{error}</div>}

      {mostrarForm && (
        <form className="form-card" onSubmit={handleSubmit}>
          <h3>Nuevo Producto</h3>

          <Input label="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} required />

          <div className="input-group">
            <label>Tipo</label>
            <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
              <option value="personal">Personal</option>
              <option value="hipotecario">Hipotecario</option>
              <option value="vehicular">Vehicular</option>
              <option value="empresarial">Empresarial</option>
              <option value="microcredito">Microcrédito</option>
            </select>
          </div>

          <Input
            label="Tasa de interés (%)"
            type="number"
            step="0.01"
            value={tasa}
            onChange={(e) => setTasa(e.target.value)}
            required
          />
          <Input
            label="Monto mínimo"
            type="number"
            step="0.01"
            value={montoMin}
            onChange={(e) => setMontoMin(e.target.value)}
            required
          />
          <Input
            label="Monto máximo"
            type="number"
            step="0.01"
            value={montoMax}
            onChange={(e) => setMontoMax(e.target.value)}
            required
          />
          <Input
            label="Plazo máximo (meses)"
            type="number"
            value={plazoMax}
            onChange={(e) => setPlazoMax(e.target.value)}
            required
          />
          <Input label="Descripción" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} />

          <Boton type="submit">Guardar</Boton>
        </form>
      )}

      {cargando ? (
        <p>Cargando...</p>
      ) : productos.length === 0 ? (
        <p>No hay productos registrados.</p>
      ) : (
        <table className="tabla">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Tipo</th>
              <th>Tasa</th>
              <th>Monto mín</th>
              <th>Monto máx</th>
              <th>Plazo máx</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productos.map((p) => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>{p.nombre}</td>
                <td>{p.tipo}</td>
                <td>{p.tasa_interes}%</td>
                <td>S/ {p.monto_minimo.toFixed(2)}</td>
                <td>S/ {p.monto_maximo.toFixed(2)}</td>
                <td>{p.plazo_maximo_meses} meses</td>
                <td>
                  <Boton variante="peligro" onClick={() => handleEliminar(p.id)}>
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