import Link from "next/link";

export default function Home() {
  return (
    <main className="inicio">
      <section className="hero">
        <div>
          <h1>SIGERUTT</h1>
          <h2>Sistema de Gestión de Rutas de Transporte Terrestre</h2>
          <p>
            Plataforma para administrar rutas, vehículos, operadores
            y asignaciones de transporte terrestre.
          </p>
        </div>
      </section>

      <section className="modulos">
        <Link href="/rutas" className="tarjeta">
          <h3>Rutas</h3>
          <p>Consulta y administra las rutas de transporte.</p>
        </Link>

        <Link href="/vehiculos" className="tarjeta">
          <h3>Vehículos</h3>
          <p>Gestiona las unidades disponibles del sistema.</p>
        </Link>

        <Link href="/operadores" className="tarjeta">
          <h3>Operadores</h3>
          <p>Consulta la información de los operadores.</p>
        </Link>

        <Link href="/asignaciones" className="tarjeta">
          <h3>Asignaciones</h3>
          <p>Relaciona rutas, vehículos y operadores.</p>
        </Link>
      </section>
    </main>
  );
}