"use client";

import Link from "next/link";
import { useState } from "react";

export default function Rutas() {
  const [buscar, setBuscar] = useState("");

  const [rutas, setRutas] = useState([
    {
      id: 1,
      nombre: "Villahermosa - Cárdenas",
      origen: "Villahermosa",
      destino: "Cárdenas",
      estado: "Activa",
    },
    {
      id: 2,
      nombre: "Villahermosa - Macuspana",
      origen: "Villahermosa",
      destino: "Macuspana",
      estado: "Activa",
    },
    {
      id: 3,
      nombre: "Comalcalco - Paraíso",
      origen: "Comalcalco",
      destino: "Paraíso",
      estado: "Inactiva",
    },
  ]);

  const rutasFiltradas = rutas.filter((ruta) =>
    ruta.nombre.toLowerCase().includes(buscar.toLowerCase()) ||
    ruta.origen.toLowerCase().includes(buscar.toLowerCase()) ||
    ruta.destino.toLowerCase().includes(buscar.toLowerCase())
  );

  function eliminarRuta(id) {
    const confirmar = confirm("¿Deseas eliminar esta ruta?");

    if (confirmar) {
      const nuevasRutas = rutas.filter((ruta) => ruta.id !== id);
      setRutas(nuevasRutas);
    }
  }

  function editarRuta(ruta) {
    alert(
      "Editar ruta:\n" +
      ruta.nombre +
      "\n\nLa pantalla de edición se agregará posteriormente."
    );
  }

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
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>

            <tbody>
              {rutasFiltradas.length > 0 ? (
                rutasFiltradas.map((ruta) => (
                  <tr key={ruta.id}>
                    <td>{ruta.id}</td>
                    <td>{ruta.nombre}</td>
                    <td>{ruta.origen}</td>
                    <td>{ruta.destino}</td>

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
                        <button
                          className="botonEditar"
                          onClick={() => editarRuta(ruta)}
                        >
                          Editar
                        </button>

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
                  <td colSpan="6" className="sinDatos">
                    No se encontraron rutas.
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