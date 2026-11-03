import "./globals.css";
import Link from "next/link";

export const metadata = {
  title: "SIGERUTT",
  description: "Sistema de Gestión de Rutas de Transporte Terrestre",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        <header className="menu">
          <div className="logo">
            <Link href="/">SIGERUTT</Link>
          </div>

          <nav>
            <Link href="/">Inicio</Link>
            <Link href="/rutas">Rutas</Link>
            <Link href="/vehiculos">Vehículos</Link>
            <Link href="/operadores">Operadores</Link>
            <Link href="/asignaciones">Asignaciones</Link>
          </nav>
        </header>

        {children}
      </body>
    </html>
  );
}