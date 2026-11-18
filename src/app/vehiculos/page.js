"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { createClient } from "../lib/supabaseClient";

export default function Vehiculos() {
  const supabase = createClient();

  const [vehiculos, setVehiculos] = useState([]);
  const [buscar, setBuscar] = useState("");
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    obtenerVehiculos();
  }, []);

  async function obtenerVehiculos() {
    setCargando(true);

    const { data, error } = await supabase
      .from("vehiculos")
      .select("*")
      .order("id", { ascending: true });

    if (error) {
      console.error(error);
      alert("Error al cargar los vehículos.");
    } else {
      setVehiculos(data || []);
    }

    setCargando(false);
  }

  async function eliminarVehiculo(id) {
    const confirmar = confirm("¿Deseas eliminar este vehículo?");

    if (!confirmar) return;

    const { error } = await supabase
      .from("vehiculos")
      .delete()
      .eq("id", id);

    if (error) {
      console.error(error);
      alert("No se pudo eliminar el vehículo.");
      return;
    }

    alert("Vehículo eliminado correctamente.");

    obtenerVehiculos();
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

  const vehiculosFiltrados = vehiculos.filter((vehiculo) => {
    const texto = buscar.toLowerCase();

    return (
      vehiculo.placa?.toLowerCase().includes(texto) ||
      vehiculo.tipo?.toLowerCase().includes(texto) ||
      vehiculo.marca?.toLowerCase().includes(texto) ||
      vehiculo.modelo?.toLowerCase().includes(texto)
    );
  });

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
              {cargando ? (
                <tr>
                  <td colSpan="8" className="sinDatos">
                    Cargando vehículos...
                  </td>
                </tr>
              ) : vehiculosFiltrados.length > 0 ? (
                vehiculosFiltrados.map((vehiculo) => (
                  <tr key={vehiculo.id}>
                    <td>{vehiculo.id}</td>
                    <td>{vehiculo.placa}</td>
                    <td>{vehiculo.tipo}</td>
                    <td>{vehiculo.marca}</td>
                    <td>{vehiculo.modelo || "Sin dato"}</td>
                    <td>{vehiculo.capacidad || "Sin dato"}</td>

                    <td>
                      <span className={claseEstado(vehiculo.estado)}>
                        {vehiculo.estado}
                      </span>
                    </td>

                    <td>
                      <div className="acciones">
                        <button
                          className="botonEliminar"
                          onClick={() =>
                            eliminarVehiculo(vehiculo.id)
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
                  <td colSpan="8" className="sinDatos">
                    No hay vehículos registrados.
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