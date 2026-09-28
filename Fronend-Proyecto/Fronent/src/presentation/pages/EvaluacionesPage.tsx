import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { listarEvaluacionesUseCase } from "../../application/evaluaciones/listar_evaluaciones_usecase";
import { calcularScoringUseCase } from "../../application/evaluaciones/calcular_scoring_usecase";
import { consultarCentralUseCase } from "../../application/evaluaciones/consultar_central_usecase";
import { evaluarSolicitudUseCase } from "../../application/evaluaciones/evaluar_solicitud_usecase";
import { listarSolicitudesUseCase } from "../../application/solicitudes/listar_solicitudes_usecase";
import type { Evaluacion } from "../../domain/entities/evaluacion";
import type { Solicitud } from "../../domain/entities/solicitud";
import { Boton } from "../components/Boton";
import { Input } from "../components/Input";

export function EvaluacionesPage() {
  const [evaluaciones, setEvaluaciones] = useState<Evaluacion[]>([]);
  const [solicitudes, setSolicitudes] = useState<Solicitud[]>([]);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState("");
  const [exito, setExito] = useState("");
  const [solicitudSeleccionada, setSolicitudSeleccionada] = useState("");
  const [paso, setPaso] = useState<1 | 2 | 3 | 4>(1);

  const [ingresos, setIngresos] = useState("");
  const [gastos, setGastos] = useState("");
  const [patrimonio, setPatrimonio] = useState("");
  const [deudas, setDeudas] = useState("");
  const [experiencia, setExperiencia] = useState("");
  const [tipoEmpleo, setTipoEmpleo] = useState("");

  const [central, setCentral] = useState("SBS");

  const [decision, setDecision] = useState("aprobado");
  const [montoAprobado, setMontoAprobado] = useState("");
  const [tasaFinal, setTasaFinal] = useState("");
  const [motivo, setMotivo] = useState("");

  async function cargarTodo() {
    setCargando(true);
    setError("");
    try {
      const [evals, sols] = await Promise.all([
        listarEvaluacionesUseCase(),
        listarSolicitudesUseCase(),
      ]);
      setEvaluaciones(evals);
      setSolicitudes(sols);
    } catch (err: any) {
      setError("Error al cargar datos");
    } finally {
      setCargando(false);
    }
  }

  useEffect(() => {
    cargarTodo();
  }, []);

  async function handleScoring(e: FormEvent) {
    e.preventDefault();
    setError("");
    setExito("");
    try {
      await calcularScoringUseCase(parseInt(solicitudSeleccionada), {
        ingresos_mensuales: parseFloat(ingresos),
        gastos_mensuales: parseFloat(gastos),
        patrimonio: patrimonio ? parseFloat(patrimonio) : 0,
        deudas_actuales: deudas ? parseFloat(deudas) : 0,
        años_experiencia_laboral: experiencia ? parseInt(experiencia) : 0,
        tipo_empleo: tipoEmpleo || undefined,
      });
      setExito("Scoring calculado correctamente");
      setPaso(2);
    } catch (err: any) {
      setError(err.response?.data?.detail || "Error al calcular scoring");
    }
  }

  async function handleVerificacion(e: FormEvent) {
    e.preventDefault();
    setError("");
    setExito("");
    try {
      await consultarCentralUseCase(parseInt(solicitudSeleccionada), { central });
      setExito("Verificación en central completada");
      setPaso(3);
    } catch (err: any) {
      setError(err.response?.data?.detail || "Error al consultar central");
    }
  }

  async function handleEvaluar(e: FormEvent) {
    e.preventDefault();
    setError("");
    setExito("");
    try {
      await evaluarSolicitudUseCase(parseInt(solicitudSeleccionada), {
        decision: decision as any,
        monto_aprobado: montoAprobado ? parseFloat(montoAprobado) : undefined,
        tasa_final: tasaFinal ? parseFloat(tasaFinal) : undefined,
        motivo: motivo || undefined,
      });
      setExito("Solicitud evaluada correctamente");
      setPaso(4);
      cargarTodo();
    } catch (err: any) {
      setError(err.response?.data?.detail || "Error al evaluar");
    }
  }

  function reiniciar() {
    setPaso(1);
    setSolicitudSeleccionada("");
    setIngresos("");
    setGastos("");
    setPatrimonio("");
    setDeudas("");
    setExperiencia("");
    setTipoEmpleo("");
    setCentral("SBS");
    setDecision("aprobado");
    setMontoAprobado("");
    setTasaFinal("");
    setMotivo("");
    setExito("");
    setError("");
  }

  return (
    <div>
      <div className="page-header">
        <h1>Evaluaciones de Crédito</h1>
        <Boton onClick={reiniciar}>Nueva evaluación</Boton>
      </div>

      {error && <div className="error-msg">{error}</div>}
      {exito && <div className="success-msg">{exito}</div>}

      <div className="form-card">
        <h3>Paso {paso} de 3</h3>
        <p style={{ color: "#64748b", marginTop: 4, marginBottom: 16 }}>
          {paso === 1 && "Selecciona la solicitud e ingresa la información financiera"}
          {paso === 2 && "Consulta la central de riesgo"}
          {paso === 3 && "Toma la decisión final"}
          {paso === 4 && "Evaluación completada"}
        </p>

        <div className="input-group">
          <label>Solicitud</label>
          <select
            value={solicitudSeleccionada}
            onChange={(e) => setSolicitudSeleccionada(e.target.value)}
            disabled={paso > 1}
          >
            <option value="">-- Seleccionar --</option>
            {solicitudes.map((s) => (
              <option key={s.id} value={s.id}>
                #{s.id} - Monto: S/ {s.monto_solicitado} - {s.estado}
              </option>
            ))}
          </select>
        </div>

        {paso === 1 && solicitudSeleccionada && (
          <form onSubmit={handleScoring}>
            <Input
              label="Ingresos mensuales"
              type="number"
              step="0.01"
              value={ingresos}
              onChange={(e) => setIngresos(e.target.value)}
              required
            />
            <Input
              label="Gastos mensuales"
              type="number"
              step="0.01"
              value={gastos}
              onChange={(e) => setGastos(e.target.value)}
              required
            />
            <Input
              label="Patrimonio"
              type="number"
              step="0.01"
              value={patrimonio}
              onChange={(e) => setPatrimonio(e.target.value)}
            />
            <Input
              label="Deudas actuales"
              type="number"
              step="0.01"
              value={deudas}
              onChange={(e) => setDeudas(e.target.value)}
            />
            <Input
              label="Años de experiencia laboral"
              type="number"
              value={experiencia}
              onChange={(e) => setExperiencia(e.target.value)}
            />
            <Input
              label="Tipo de empleo"
              value={tipoEmpleo}
              onChange={(e) => setTipoEmpleo(e.target.value)}
            />
            <Boton type="submit">Calcular scoring</Boton>
          </form>
        )}

        {paso === 2 && (
          <form onSubmit={handleVerificacion}>
            <Input label="Central de riesgo" value={central} onChange={(e) => setCentral(e.target.value)} required />
            <Boton type="submit">Consultar central</Boton>
          </form>
        )}

        {paso === 3 && (
          <form onSubmit={handleEvaluar}>
            <div className="input-group">
              <label>Decisión</label>
              <select value={decision} onChange={(e) => setDecision(e.target.value)}>
                <option value="aprobado">Aprobado</option>
                <option value="rechazado">Rechazado</option>
              </select>
            </div>

            {decision === "aprobado" && (
              <>
                <Input
                  label="Monto aprobado"
                  type="number"
                  step="0.01"
                  value={montoAprobado}
                  onChange={(e) => setMontoAprobado(e.target.value)}
                  required
                />
                <Input
                  label="Tasa final (%)"
                  type="number"
                  step="0.01"
                  value={tasaFinal}
                  onChange={(e) => setTasaFinal(e.target.value)}
                />
              </>
            )}

            <Input label="Motivo" value={motivo} onChange={(e) => setMotivo(e.target.value)} />

            <Boton type="submit">Enviar decisión</Boton>
          </form>
        )}
      </div>

      <h2 style={{ marginBottom: 16 }}>Historial de Evaluaciones</h2>

      {cargando ? (
        <p>Cargando...</p>
      ) : evaluaciones.length === 0 ? (
        <p>No hay evaluaciones registradas.</p>
      ) : (
        <table className="tabla">
          <thead>
            <tr>
              <th>ID</th>
              <th>Solicitud</th>
              <th>Analista</th>
              <th>Decisión</th>
              <th>Monto aprobado</th>
              <th>Motivo</th>
            </tr>
          </thead>
          <tbody>
            {evaluaciones.map((e) => (
              <tr key={e.id}>
                <td>{e.id}</td>
                <td>#{e.solicitud_id}</td>
                <td>{e.analista_id}</td>
                <td>
                  <span
                    style={{
                      background: e.decision === "aprobado" ? "#10b981" : "#ef4444",
                      color: "white",
                      padding: "4px 10px",
                      borderRadius: "12px",
                      fontSize: 12,
                    }}
                  >
                    {e.decision}
                  </span>
                </td>
                <td>{e.monto_aprobado ? `S/ ${e.monto_aprobado.toFixed(2)}` : "-"}</td>
                <td>{e.motivo || "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}