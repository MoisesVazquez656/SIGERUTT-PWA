"use client";

import Link from "next/link";
import { useState } from "react";

export default function Vehiculos() {
  const [buscar, setBuscar] = useState("");

  const [vehiculos, setVehiculos] = useState([
    {
      id: 1,
      placa: "TB-2456-A",
      tipo: "Camión",
      marca: "Freightliner",
      modelo: "Cascadia",
      capacidad: "15 toneladas",
      estado: "Disponible",
    },
    {
      id: 2,
      placa: "TB-7788-B",
      tipo: "Camioneta",
      marca: "Nissan",
      modelo: "NP300",
      capacidad: "1 tonelada",
      estado: "Asignado",
    },
    {
      id: 3,
      placa: "TB-9032-C",
      tipo: "Tráiler",
      marca: "Kenworth",
      modelo: "T680",
      capacidad: "25 toneladas",
      estado: "Mantenimiento",
    },
  ]);

  const vehiculosFiltrados = vehiculos.filter((vehiculo) =>
    vehiculo.placa.toLowerCase().includes(buscar.toLowerCase()) ||
    vehiculo.tipo.toLowerCase().includes(buscar.toLowerCase()) ||
    vehiculo.marca.toLowerCase().includes(buscar.toLowerCase()) ||
    vehiculo.modelo.toLowerCase().includes(buscar.toLowerCase())
  );

  function eliminarVehiculo(id) {
    const confirmar = confirm("¿Deseas eliminar este vehículo?");

    if (confirmar) {
      const nuevosVehiculos = vehiculos.filter(
        (vehiculo) => vehiculo.id !== id
      );

      setVehiculos(nuevosVehiculos);
    }
  }

  function editarVehiculo(vehiculo) {
    alert(
      "Editar vehículo:\n" +
      vehiculo.placa +
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

    if (estado === "Mantenimiento") {
      return "estadoMantenimiento";
    }

    return "estadoInactivo";
  }

  return (
    <main className="pagina">

      <div className="encabezadoPagina">
        <div>
          <h1>Gestión de Vehículos</h1>

          <p>
            Consulta y administra las unidades de transporte registradas.
          </p>
        </div>

        <Link href="/vehiculos/nuevo" className="botonPrincipal">
          + Nuevo vehículo
        </Link>
      </div>

      <section className="contenido">

        <div className="busqueda">
          <input
            type="text"
            placeholder="Buscar por placa, tipo, marca o modelo..."
            value={buscar}
            onChange={(e) => setBuscar(e.target.value)}
          />
        </div>

        <div className="tablaContenedor">
          <table>

            <thead>
              <tr>
                <th>ID</th>
                <th>Placa</th>
                <th>Tipo</th>
                <th>Marca</th>
                <th>Modelo</th>
                <th>Capacidad</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>

            <tbody>

              {vehiculosFiltrados.length > 0 ? (

                vehiculosFiltrados.map((vehiculo) => (

                  <tr key={vehiculo.id}>

                    <td>{vehiculo.id}</td>

                    <td>{vehiculo.placa}</td>

                    <td>{vehiculo.tipo}</td>

                    <td>{vehiculo.marca}</td>

                    <td>{vehiculo.modelo}</td>

                    <td>{vehiculo.capacidad}</td>

                    <td>
                      <span className={claseEstado(vehiculo.estado)}>
                        {vehiculo.estado}
                      </span>
                    </td>

                    <td>

                      <div className="acciones">

                        <button
                          className="botonEditar"
                          onClick={() => editarVehiculo(vehiculo)}
                        >
                          Editar
                        </button>

                        <button
                          className="botonEliminar"
                          onClick={() => eliminarVehiculo(vehiculo.id)}
                        >
                          Eliminar
                        </button>

                      </div>

                    </td>

                  </tr>

                ))

              ) : (

                <tr>
                  <td colSpan="8" className="sinDatos">
                    No se encontraron vehículos.
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