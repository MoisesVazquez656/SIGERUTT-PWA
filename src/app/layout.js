import "./globals.css";
import Link from "next/link";
import Logout from "./componentes/Logout";
import { Inter } from "next/font/google";
import RegistrarSW from "./componentes/RegistrarSW";


export const metadata = {
  title: {
    default: "SIGERUTT",
    template: "%s | SIGERUTT",
  },
  description:
    "Sistema de Gestión de Rutas de Transporte Terrestre",
  manifest: "/manifest.webmanifest",
};

export const viewport = {
  themeColor: "#ff7a00",
};

const inter = Inter({
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <RegistrarSW />
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
            <Logout />
          </nav>
        </header>

        {children}
      </body>
    </html>
  );
}