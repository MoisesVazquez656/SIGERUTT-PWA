"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { createClient } from "../lib/supabaseClient";

export default function Rutas() {
  const supabase = createClient();

  const [rutas, setRutas] = useState([]);
  const [buscar, setBuscar] = useState("");
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    obtenerRutas();
  }, []);

  async function obtenerRutas() {
    setCargando(true);

    const {
    data: { user },
    } = await supabase.auth.getUser();

    console.log("USUARIO EN RUTAS:", user);

    const { data, error } = await supabase
      .from("rutas")
      .select("*")
      .order("id", { ascending: true });

    if (error) {
      console.error(error);
      alert("Error al cargar las rutas.");
    } else {
      setRutas(data || []);
    }

    setCargando(false);
  }

  async function eliminarRuta(id) {
    const confirmar = confirm("¿Deseas eliminar esta ruta?");

    if (!confirmar) return;

    const { error } = await supabase
      .from("rutas")
      .delete()
      .eq("id", id);

    if (error) {
      console.error(error);
      alert("No se pudo eliminar la ruta.");
      return;
    }

    alert("Ruta eliminada correctamente.");

    obtenerRutas();
  }

  const rutasFiltradas = rutas.filter((ruta) => {
    const texto = buscar.toLowerCase();

    return (
      ruta.nombre?.toLowerCase().includes(texto) ||
      ruta.origen?.toLowerCase().includes(texto) ||
      ruta.destino?.toLowerCase().includes(texto)
    );
  });

  return (
    <main className="pagina">
      <div className="encabezadoPagina">
        <div>
          <h1>Gestión de Rutas</h1>
          <p>
            Consulta, registra y administra las rutas de transporte terrestre.
          </p>
        </div>

        <Link href="/rutas/nueva" className="botonPrincipal">
          + Nueva ruta
        </Link>
      </div>

      <section className="contenido">
        <div className="busqueda">
          <input
            type="text"
            placeholder="Buscar por ruta, origen o destino..."
            value={buscar}
            onChange={(e) => setBuscar(e.target.value)}
          />
        </div>

        <div className="tablaContenedor">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Ruta</th>
                <th>Origen</th>
                <th>Destino</th>
                <th>Distancia</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>

            <tbody>
              {cargando ? (
                <tr>
                  <td colSpan="7" className="sinDatos">
                    Cargando rutas...
                  </td>
                </tr>
              ) : rutasFiltradas.length > 0 ? (
                rutasFiltradas.map((ruta) => (
                  <tr key={ruta.id}>
                    <td>{ruta.id}</td>
                    <td>{ruta.nombre}</td>
                    <td>{ruta.origen}</td>
                    <td>{ruta.destino}</td>

                    <td>
                      {ruta.distancia
                        ? `${ruta.distancia} km`
                        : "Sin dato"}
                    </td>

                    <td>
                      <span
                        className={
                          ruta.estado === "Activa"
                            ? "estadoActivo"
                            : "estadoInactivo"
                        }
                      >
                        {ruta.estado}
                      </span>
                    </td>

                    <td>
                      <div className="acciones">
                        <Link
                          href={`/rutas/editar/${ruta.id}`}
                          className="botonEditar"
                        >
                          Editar
                        </Link>

                        <button
                          className="botonEliminar"
                          onClick={() => eliminarRuta(ruta.id)}
                        >
                          Eliminar
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="sinDatos">
                    No hay rutas registradas.
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