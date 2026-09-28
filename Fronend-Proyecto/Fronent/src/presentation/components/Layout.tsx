import { Outlet } from "react-router-dom";
import { Navbar } from "./Navbar";

export function Layout() {
  return (
    <div className="layout">
      <Navbar />
      <main className="contenido">
        <Outlet />
      </main>
    </div>
  );
}