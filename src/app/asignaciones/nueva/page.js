"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "../../lib/supabaseClient";

export default function NuevaAsignacion() {
  const router = useRouter();
  const supabase = createClient();

  const [rutas, setRutas] = useState([]);
  const [vehiculos, setVehiculos] = useState([]);
  const [operadores, setOperadores] = useState([]);

  const [formulario, setFormulario] = useState({
    ruta_id: "",
    vehiculo_id: "",
    operador_id: "",
    fecha: "",
    hora: "",
    estado: "Programada",
  });

  useEffect(() => {
    cargarDatos();
  }, []);

  async function cargarDatos() {
    const { data: rutasData } = await supabase
      .from("rutas")
      .select("id, nombre")
      .eq("estado", "Activa");

    const { data: vehiculosData } = await supabase
      .from("vehiculos")
      .select("id, placa")
      .eq("estado", "Disponible");

    const { data: operadoresData } = await supabase
      .from("operadores")
      .select("id, nombre")
      .eq("estado", "Disponible");

    setRutas(rutasData || []);
    setVehiculos(vehiculosData || []);
    setOperadores(operadoresData || []);
  }

  function cambiarDato(e) {
    setFormulario({
      ...formulario,
      [e.target.name]: e.target.value,
    });
  }

  async function guardarAsignacion(e) {
    e.preventDefault();

    if (
      !formulario.ruta_id ||
      !formulario.vehiculo_id ||
      !formulario.operador_id ||
      !formulario.fecha
    ) {
      alert("Completa los campos obligatorios.");
      return;
    }

    const { error } = await supabase
      .from("asignaciones")
      .insert([
        {
          ruta_id: Number(formulario.ruta_id),
          vehiculo_id: Number(
            formulario.vehiculo_id
          ),
          operador_id: Number(
            formulario.operador_id
          ),
          fecha: formulario.fecha,
          hora: formulario.hora || null,
          estado: formulario.estado,
        },
      ]);

    if (error) {
      console.error(error);
      alert("No se pudo registrar.");
      return;
    }

    alert("Asignación registrada correctamente.");

    router.push("/asignaciones");
    router.refresh();
  }

  return (
    <main className="pagina">

      <div className="encabezadoFormulario">
        <h1>Nueva Asignación</h1>

        <p>
          Asigna una ruta, vehículo y operador.
        </p>
      </div>

      <section className="formularioContenedor">

        <form
          onSubmit={guardarAsignacion}
          className="formulario"
        >

          <div className="campo">
            <label>Ruta *</label>

            <select
              name="ruta_id"
              value={formulario.ruta_id}
              onChange={cambiarDato}
            >
              <option value="">
                Selecciona una ruta
              </option>

              {rutas.map((ruta) => (
                <option
                  key={ruta.id}
                  value={ruta.id}
                >
                  {ruta.nombre}
                </option>
              ))}

            </select>
          </div>

          <div className="filaFormulario">

            <div className="campo">
              <label>Vehículo *</label>

              <select
                name="vehiculo_id"
                value={formulario.vehiculo_id}
                onChange={cambiarDato}
              >

                <option value="">
                  Selecciona un vehículo
                </option>

                {vehiculos.map((vehiculo) => (
                  <option
                    key={vehiculo.id}
                    value={vehiculo.id}
                  >
                    {vehiculo.placa}
                  </option>
                ))}

              </select>
            </div>

            <div className="campo">
              <label>Operador *</label>

              <select
                name="operador_id"
                value={formulario.operador_id}
                onChange={cambiarDato}
              >

                <option value="">
                  Selecciona un operador
                </option>

                {operadores.map((operador) => (
                  <option
                    key={operador.id}
                    value={operador.id}
                  >
                    {operador.nombre}
                  </option>
                ))}

              </select>
            </div>

          </div>

          <div className="filaFormulario">

            <div className="campo">
              <label>Fecha *</label>

              <input
                type="date"
                name="fecha"
                value={formulario.fecha}
                onChange={cambiarDato}
              />
            </div>

            <div className="campo">
              <label>Hora</label>

              <input
                type="time"
                name="hora"
                value={formulario.hora}
                onChange={cambiarDato}
              />
            </div>

          </div>

          <div className="campo">

            <label>Estado</label>

            <select
              name="estado"
              value={formulario.estado}
              onChange={cambiarDato}
            >
              <option>Programada</option>
              <option>En ruta</option>
              <option>Finalizada</option>
              <option>Cancelada</option>
            </select>

          </div>

          <div className="botonesFormulario">

            <button
              type="button"
              className="botonCancelar"
              onClick={() =>
                router.push("/asignaciones")
              }
            >
              Cancelar
            </button>

            <button
              type="submit"
              className="botonGuardar"
            >
              Guardar asignación
            </button>

          </div>

        </form>

      </section>

    </main>
  );
}