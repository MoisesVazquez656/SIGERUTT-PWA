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

      <section className="dashboard">
        <h2>Resumen del sistema</h2>

        <div className="resumenGrid">
          <div className="resumenCard">
            <span className="resumenNumero">3</span>
            <span className="resumenTitulo">Rutas</span>
            <p>Rutas disponibles en el sistema.</p>
          </div>

          <div className="resumenCard">
            <span className="resumenNumero">3</span>
            <span className="resumenTitulo">Vehículos</span>
            <p>Unidades registradas.</p>
          </div>

          <div className="resumenCard">
            <span className="resumenNumero">3</span>
            <span className="resumenTitulo">Operadores</span>
            <p>Operadores registrados.</p>
          </div>

          <div className="resumenCard">
            <span className="resumenNumero">3</span>
            <span className="resumenTitulo">Asignaciones</span>
            <p>Servicios programados.</p>
          </div>
        </div>

        <h2 className="tituloAccesos">Accesos rápidos</h2>

        <div className="modulos">
          <Link href="/rutas" className="tarjeta">
            <h3>Rutas</h3>
            <p>
              Consulta, registra y administra las rutas de transporte.
            </p>
            <span>Administrar rutas →</span>
          </Link>

          <Link href="/vehiculos" className="tarjeta">
            <h3>Vehículos</h3>
            <p>
              Gestiona las unidades utilizadas para los servicios.
            </p>
            <span>Administrar vehículos →</span>
          </Link>

          <Link href="/operadores" className="tarjeta">
            <h3>Operadores</h3>
            <p>
              Consulta y administra los operadores de transporte.
            </p>
            <span>Administrar operadores →</span>
          </Link>

          <Link href="/asignaciones" className="tarjeta">
            <h3>Asignaciones</h3>
            <p>
              Relaciona rutas, unidades y operadores.
            </p>
            <span>Administrar asignaciones →</span>
          </Link>
        </div>
      </section>
    </main>
  );
}