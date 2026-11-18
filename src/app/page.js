"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { createClient } from "./lib/supabaseClient";

export default function Home() {
  const supabase = createClient();

  const [resumen, setResumen] = useState({
    rutas: 0,
    vehiculos: 0,
    operadores: 0,
    asignaciones: 0,
  });

  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    cargarResumen();
  }, []);

  async function cargarResumen() {
    setCargando(true);

    const [
      rutas,
      vehiculos,
      operadores,
      asignaciones,
    ] = await Promise.all([
      supabase
        .from("rutas")
        .select("*", { count: "exact", head: true }),

      supabase
        .from("vehiculos")
        .select("*", { count: "exact", head: true }),

      supabase
        .from("operadores")
        .select("*", { count: "exact", head: true }),

      supabase
        .from("asignaciones")
        .select("*", { count: "exact", head: true }),
    ]);

    setResumen({
      rutas: rutas.count || 0,
      vehiculos: vehiculos.count || 0,
      operadores: operadores.count || 0,
      asignaciones: asignaciones.count || 0,
    });

    setCargando(false);
  }

  return (
    <main className="dashboardPagina">

      <section className="dashboardHero">
        <div>
          <span className="etiquetaDashboard">
            Panel administrativo
          </span>

          <h1>SIGERUTT</h1>

          <h2>
            Sistema de Gestión de Rutas de Transporte Terrestre
          </h2>

          <p>
            Administra rutas, vehículos, operadores y
            asignaciones desde una sola plataforma.
          </p>
        </div>
      </section>

      <section className="dashboardContenido">

        <div className="tituloSeccion">
          <div>
            <h2>Resumen general</h2>
            <p>
              Información actual registrada en el sistema.
            </p>
          </div>
        </div>

        <div className="resumenGrid">

          <Link href="/rutas" className="resumenCard">
            <div className="iconoCard">R</div>

            <div>
              <span className="resumenNumero">
                {cargando ? "..." : resumen.rutas}
              </span>

              <h3>Rutas</h3>

              <p>Rutas registradas</p>
            </div>
          </Link>

          <Link href="/vehiculos" className="resumenCard">
            <div className="iconoCard">V</div>

            <div>
              <span className="resumenNumero">
                {cargando ? "..." : resumen.vehiculos}
              </span>

              <h3>Vehículos</h3>

              <p>Unidades de transporte</p>
            </div>
          </Link>

          <Link href="/operadores" className="resumenCard">
            <div className="iconoCard">O</div>

            <div>
              <span className="resumenNumero">
                {cargando ? "..." : resumen.operadores}
              </span>

              <h3>Operadores</h3>

              <p>Operadores registrados</p>
            </div>
          </Link>

          <Link
            href="/asignaciones"
            className="resumenCard"
          >
            <div className="iconoCard">A</div>

            <div>
              <span className="resumenNumero">
                {cargando ? "..." : resumen.asignaciones}
              </span>

              <h3>Asignaciones</h3>

              <p>Servicios registrados</p>
            </div>
          </Link>

        </div>

        <div className="tituloSeccion accesosTitulo">
          <div>
            <h2>Accesos rápidos</h2>
            <p>
              Ingresa directamente a los módulos principales.
            </p>
          </div>
        </div>

        <div className="accesosGrid">

          <Link href="/rutas" className="accesoCard">
            <span className="accesoIcono">01</span>

            <div>
              <h3>Gestión de Rutas</h3>
              <p>
                Registra y administra los recorridos.
              </p>
            </div>

            <span className="flechaCard">→</span>
          </Link>

          <Link href="/vehiculos" className="accesoCard">
            <span className="accesoIcono">02</span>

            <div>
              <h3>Gestión de Vehículos</h3>
              <p>
                Administra las unidades de transporte.
              </p>
            </div>

            <span className="flechaCard">→</span>
          </Link>

          <Link href="/operadores" className="accesoCard">
            <span className="accesoIcono">03</span>

            <div>
              <h3>Gestión de Operadores</h3>
              <p>
                Controla la información de conductores.
              </p>
            </div>

            <span className="flechaCard">→</span>
          </Link>

          <Link
            href="/asignaciones"
            className="accesoCard"
          >
            <span className="accesoIcono">04</span>

            <div>
              <h3>Asignaciones</h3>
              <p>
                Relaciona rutas, vehículos y operadores.
              </p>
            </div>

            <span className="flechaCard">→</span>
          </Link>

        </div>

      </section>
    </main>
  );
}