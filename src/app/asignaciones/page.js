"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { createClient } from "../lib/supabaseClient";

export default function Asignaciones() {
  const supabase = createClient();

  const [asignaciones, setAsignaciones] = useState([]);
  const [buscar, setBuscar] = useState("");
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    obtenerAsignaciones();
  }, []);

  async function obtenerAsignaciones() {
    setCargando(true);

    const { data, error } = await supabase
      .from("asignaciones")
      .select(`
        id,
        fecha,
        hora,
        estado,
        rutas (
          nombre
        ),
        vehiculos (
          placa
        ),
        operadores (
          nombre
        )
      `)
      .order("id", { ascending: true });

    if (error) {
      console.error(error);

      alert(
        "Error al cargar las asignaciones."
      );
    } else {
      setAsignaciones(data || []);
    }

    setCargando(false);
  }

  async function eliminarAsignacion(id) {
    const confirmar = confirm(
      "¿Deseas eliminar esta asignación?"
    );

    if (!confirmar) return;

    const { error } = await supabase
      .from("asignaciones")
      .delete()
      .eq("id", id);

    if (error) {
      alert("No se pudo eliminar.");
      return;
    }

    obtenerAsignaciones();
  }

  function claseEstado(estado) {
    if (estado === "Finalizada") {
      return "estadoActivo";
    }

    if (estado === "Programada") {
      return "estadoAsignado";
    }

    if (estado === "En ruta") {
      return "estadoMantenimiento";
    }

    return "estadoInactivo";
  }

  const filtradas = asignaciones.filter((a) => {
    const texto = buscar.toLowerCase();

    return (
      a.rutas?.nombre
        ?.toLowerCase()
        .includes(texto) ||

      a.vehiculos?.placa
        ?.toLowerCase()
        .includes(texto) ||

      a.operadores?.nombre
        ?.toLowerCase()
        .includes(texto)
    );
  });

  return (
    <main className="pagina">

      <div className="encabezadoPagina">

        <div>
          <h1>Gestión de Asignaciones</h1>

          <p>
            Relaciona rutas, vehículos y operadores.
          </p>
        </div>

        <Link
          href="/asignaciones/nueva"
          className="botonPrincipal"
        >
          + Nueva asignación
        </Link>

      </div>

      <section className="contenido">

        <div className="busqueda">

          <input
            type="text"
            placeholder="Buscar asignación..."
            value={buscar}
            onChange={(e) =>
              setBuscar(e.target.value)
            }
          />

        </div>

        <div className="tablaContenedor">

          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Ruta</th>
                <th>Vehículo</th>
                <th>Operador</th>
                <th>Fecha</th>
                <th>Hora</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>

            <tbody>

              {cargando ? (

                <tr>
                  <td colSpan="8">
                    Cargando asignaciones...
                  </td>
                </tr>

              ) : filtradas.length > 0 ? (

                filtradas.map((a) => (

                  <tr key={a.id}>

                    <td>{a.id}</td>

                    <td>
                      {a.rutas?.nombre}
                    </td>

                    <td>
                      {a.vehiculos?.placa}
                    </td>

                    <td>
                      {a.operadores?.nombre}
                    </td>

                    <td>{a.fecha}</td>

                    <td>{a.hora}</td>

                    <td>
                      <span
                        className={claseEstado(
                          a.estado
                        )}
                      >
                        {a.estado}
                      </span>
                    </td>

                    <td>
                      <button
                        className="botonEliminar"
                        onClick={() =>
                          eliminarAsignacion(a.id)
                        }
                      >
                        Eliminar
                      </button>
                    </td>

                  </tr>

                ))

              ) : (

                <tr>
                  <td
                    colSpan="8"
                    className="sinDatos"
                  >
                    No hay asignaciones registradas.
                  </td>
                </tr>

              )}

            </tbody>
          </table>

        </div>

      </section>
    </main>
  );
}