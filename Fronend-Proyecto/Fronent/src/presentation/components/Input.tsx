import { useState } from "react";
import type { InputHTMLAttributes } from "react";
import { IconoOjo, IconoOjoCerrado } from "./Iconos";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export function Input({ label, type = "text", ...props }: InputProps) {
  const [mostrarPassword, setMostrarPassword] = useState(false);
  const esPassword = type === "password";
  const tipoFinal = esPassword && mostrarPassword ? "text" : type;

  return (
    <div className="input-group">
      <label>{label}</label>
      <div className="input-wrapper">
        <input type={tipoFinal} {...props} />
        {esPassword && (
          <button
            type="button"
            className="toggle-password"
            onClick={() => setMostrarPassword(!mostrarPassword)}
            tabIndex={-1}
            aria-label={mostrarPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
          >
            {mostrarPassword ? <IconoOjoCerrado size={18} /> : <IconoOjo size={18} />}
          </button>
        )}
      </div>
    </div>
  );
}