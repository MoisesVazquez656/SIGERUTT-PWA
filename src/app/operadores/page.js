"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { createClient } from "../lib/supabaseClient";

export default function Operadores() {
  const supabase = createClient();

  const [operadores, setOperadores] = useState([]);
  const [buscar, setBuscar] = useState("");
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    obtenerOperadores();
  }, []);

  async function obtenerOperadores() {
    setCargando(true);

    const { data, error } = await supabase
      .from("operadores")
      .select("*")
      .order("id", { ascending: true });

    if (error) {
      console.error(error);
      alert("Error al cargar los operadores.");
    } else {
      setOperadores(data || []);
    }

    setCargando(false);
  }

  async function eliminarOperador(id) {
    const confirmar = confirm(
      "¿Deseas eliminar este operador?"
    );

    if (!confirmar) return;

    const { error } = await supabase
      .from("operadores")
      .delete()
      .eq("id", id);

    if (error) {
      alert("No se pudo eliminar el operador.");
      return;
    }

    obtenerOperadores();
  }

  function claseEstado(estado) {
    if (estado === "Disponible") return "estadoActivo";
    if (estado === "Asignado") return "estadoAsignado";
    if (estado === "Descanso") return "estadoMantenimiento";

    return "estadoInactivo";
  }

  const operadoresFiltrados = operadores.filter((operador) => {
    const texto = buscar.toLowerCase();

    return (
      operador.nombre?.toLowerCase().includes(texto) ||
      operador.licencia?.toLowerCase().includes(texto) ||
      operador.telefono?.toLowerCase().includes(texto) ||
      operador.correo?.toLowerCase().includes(texto)
    );
  });

  return (
    <main className="pagina">

      <div className="encabezadoPagina">
        <div>
          <h1>Gestión de Operadores</h1>

          <p>
            Consulta y administra los operadores registrados.
          </p>
        </div>

        <Link
          href="/operadores/nuevo"
          className="botonPrincipal"
        >
          + Nuevo operador
        </Link>
      </div>

      <section className="contenido">

        <div className="busqueda">
          <input
            type="text"
            placeholder="Buscar operador..."
            value={buscar}
            onChange={(e) => setBuscar(e.target.value)}
          />
        </div>

        <div className="tablaContenedor">

          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Licencia</th>
                <th>Teléfono</th>
                <th>Correo</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>

            <tbody>

              {cargando ? (

                <tr>
                  <td colSpan="7" className="sinDatos">
                    Cargando operadores...
                  </td>
                </tr>

              ) : operadoresFiltrados.length > 0 ? (

                operadoresFiltrados.map((operador) => (

                  <tr key={operador.id}>
                    <td>{operador.id}</td>
                    <td>{operador.nombre}</td>
                    <td>{operador.licencia}</td>
                    <td>{operador.telefono}</td>
                    <td>{operador.correo}</td>

                    <td>
                      <span
                        className={claseEstado(
                          operador.estado
                        )}
                      >
                        {operador.estado}
                      </span>
                    </td>

                    <td>
                      <button
                        className="botonEliminar"
                        onClick={() =>
                          eliminarOperador(operador.id)
                        }
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>

                ))

              ) : (

                <tr>
                  <td colSpan="7" className="sinDatos">
                    No hay operadores registrados.
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