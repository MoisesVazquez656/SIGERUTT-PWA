"use client";

import Link from "next/link";
import { useState } from "react";

export default function Asignaciones() {
  const [buscar, setBuscar] = useState("");

  const [asignaciones, setAsignaciones] = useState([
    {
      id: 1,
      ruta: "Villahermosa - Cárdenas",
      vehiculo: "TB-2456-A",
      operador: "Juan Pérez López",
      fecha: "2026-11-05",
      hora: "08:00",
      estado: "Programada",
    },
    {
      id: 2,
      ruta: "Villahermosa - Macuspana",
      vehiculo: "TB-7788-B",
      operador: "Carlos Hernández Ruiz",
      fecha: "2026-11-06",
      hora: "10:30",
      estado: "En ruta",
    },
    {
      id: 3,
      ruta: "Comalcalco - Paraíso",
      vehiculo: "TB-9032-C",
      operador: "Miguel Sánchez Díaz",
      fecha: "2026-11-07",
      hora: "07:00",
      estado: "Finalizada",
    },
  ]);

  const asignacionesFiltradas = asignaciones.filter((asignacion) =>
    asignacion.ruta.toLowerCase().includes(buscar.toLowerCase()) ||
    asignacion.vehiculo.toLowerCase().includes(buscar.toLowerCase()) ||
    asignacion.operador.toLowerCase().includes(buscar.toLowerCase()) ||
    asignacion.estado.toLowerCase().includes(buscar.toLowerCase())
  );

  function eliminarAsignacion(id) {
    const confirmar = confirm(
      "¿Deseas eliminar esta asignación?"
    );

    if (confirmar) {
      const nuevasAsignaciones = asignaciones.filter(
        (asignacion) => asignacion.id !== id
      );

      setAsignaciones(nuevasAsignaciones);
    }
  }

  function editarAsignacion(asignacion) {
    alert(
      "Editar asignación:\n" +
      asignacion.ruta +
      "\n\nLa pantalla de edición se agregará posteriormente."
    );
  }

  function claseEstado(estado) {
    if (estado === "Programada") {
      return "estadoAsignado";
    }

    if (estado === "En ruta") {
      return "estadoMantenimiento";
    }

    if (estado === "Finalizada") {
      return "estadoActivo";
    }

    return "estadoInactivo";
  }

  return (
    <main className="pagina">

      <div className="encabezadoPagina">
        <div>
          <h1>Gestión de Asignaciones</h1>

          <p>
            Relaciona rutas, vehículos y operadores para organizar
            los servicios de transporte.
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
            placeholder="Buscar por ruta, vehículo, operador o estado..."
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
                <th>Vehículo</th>
                <th>Operador</th>
                <th>Fecha</th>
                <th>Hora</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>

            <tbody>

              {asignacionesFiltradas.length > 0 ? (

                asignacionesFiltradas.map((asignacion) => (

                  <tr key={asignacion.id}>

                    <td>{asignacion.id}</td>

                    <td>{asignacion.ruta}</td>

                    <td>{asignacion.vehiculo}</td>

                    <td>{asignacion.operador}</td>

                    <td>{asignacion.fecha}</td>

                    <td>{asignacion.hora}</td>

                    <td>
                      <span
                        className={claseEstado(asignacion.estado)}
                      >
                        {asignacion.estado}
                      </span>
                    </td>

                    <td>

                      <div className="acciones">

                        <button
                          className="botonEditar"
                          onClick={() =>
                            editarAsignacion(asignacion)
                          }
                        >
                          Editar
                        </button>

                        <button
                          className="botonEliminar"
                          onClick={() =>
                            eliminarAsignacion(asignacion.id)
                          }
                        >
                          Eliminar
                        </button>

                      </div>

                    </td>

                  </tr>

                ))

              ) : (

                <tr>
                  <td
                    colSpan="8"
                    className="sinDatos"
                  >
                    No se encontraron asignaciones.
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