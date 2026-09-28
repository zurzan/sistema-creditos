import type { ButtonHTMLAttributes } from "react";

interface BotonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variante?: "primario" | "secundario" | "peligro";
}

export function Boton({ variante = "primario", children, ...props }: BotonProps) {
  return (
    <button className={`boton boton-${variante}`} {...props}>
      {children}
    </button>
  );
}