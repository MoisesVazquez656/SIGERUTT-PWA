"use client";

import Link from "next/link";
import { useState } from "react";

export default function Operadores() {
  const [buscar, setBuscar] = useState("");

  const [operadores, setOperadores] = useState([
    {
      id: 1,
      nombre: "Juan Pérez López",
      licencia: "LIC-2026-001",
      telefono: "9931234567",
      correo: "juan@correo.com",
      estado: "Disponible",
    },
    {
      id: 2,
      nombre: "Carlos Hernández Ruiz",
      licencia: "LIC-2026-002",
      telefono: "9939876543",
      correo: "carlos@correo.com",
      estado: "Asignado",
    },
    {
      id: 3,
      nombre: "Miguel Sánchez Díaz",
      licencia: "LIC-2026-003",
      telefono: "9935552211",
      correo: "miguel@correo.com",
      estado: "Descanso",
    },
  ]);

  const operadoresFiltrados = operadores.filter((operador) =>
    operador.nombre.toLowerCase().includes(buscar.toLowerCase()) ||
    operador.licencia.toLowerCase().includes(buscar.toLowerCase()) ||
    operador.telefono.toLowerCase().includes(buscar.toLowerCase()) ||
    operador.correo.toLowerCase().includes(buscar.toLowerCase())
  );

  function eliminarOperador(id) {
    const confirmar = confirm("¿Deseas eliminar este operador?");

    if (confirmar) {
      const nuevosOperadores = operadores.filter(
        (operador) => operador.id !== id
      );

      setOperadores(nuevosOperadores);
    }
  }

  function editarOperador(operador) {
    alert(
      "Editar operador:\n" +
      operador.nombre +
      "\n\nLa pantalla de edición se agregará posteriormente."
    );
  }

  function claseEstado(estado) {
    if (estado === "Disponible") {
      return "estadoActivo";
    }

    if (estado === "Asignado") {
      return "estadoAsignado";
    }

    if (estado === "Descanso") {
      return "estadoMantenimiento";
    }

    return "estadoInactivo";
  }

  return (
    <main className="pagina">

      <div className="encabezadoPagina">
        <div>
          <h1>Gestión de Operadores</h1>

          <p>
            Consulta y administra los operadores registrados en el sistema.
          </p>
        </div>

        <Link href="/operadores/nuevo" className="botonPrincipal">
          + Nuevo operador
        </Link>
      </div>

      <section className="contenido">

        <div className="busqueda">
          <input
            type="text"
            placeholder="Buscar por nombre, licencia, teléfono o correo..."
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

              {operadoresFiltrados.length > 0 ? (

                operadoresFiltrados.map((operador) => (

                  <tr key={operador.id}>

                    <td>{operador.id}</td>

                    <td>{operador.nombre}</td>

                    <td>{operador.licencia}</td>

                    <td>{operador.telefono}</td>

                    <td>{operador.correo}</td>

                    <td>
                      <span className={claseEstado(operador.estado)}>
                        {operador.estado}
                      </span>
                    </td>

                    <td>
                      <div className="acciones">

                        <button
                          className="botonEditar"
                          onClick={() => editarOperador(operador)}
                        >
                          Editar
                        </button>

                        <button
                          className="botonEliminar"
                          onClick={() => eliminarOperador(operador.id)}
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
                    No se encontraron operadores.
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