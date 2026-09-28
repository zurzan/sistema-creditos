import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Layout } from "../components/Layout";
import { RutaProtegida } from "../components/RutaProtegida";
import { LoginPage } from "../pages/LoginPage";
import { RegistroPage } from "../pages/RegistroPage";
import { HomePage } from "../pages/HomePage";
import { ClientesPage } from "../pages/ClientesPage";
import { ProductosPage } from "../pages/ProductosPage";
import { SolicitudesPage } from "../pages/SolicitudesPage";
import { EvaluacionesPage } from "../pages/EvaluacionesPage";

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/registro" element={<RegistroPage />} />

        <Route
          element={
            <RutaProtegida>
              <Layout />
            </RutaProtegida>
          }
        >
          <Route path="/" element={<HomePage />} />
          <Route path="/clientes" element={<ClientesPage />} />
          <Route path="/productos" element={<ProductosPage />} />
          <Route path="/solicitudes" element={<SolicitudesPage />} />
          <Route path="/evaluaciones" element={<EvaluacionesPage />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}