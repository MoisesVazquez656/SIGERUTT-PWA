"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NuevaAsignacion() {
  const router = useRouter();

  const [formulario, setFormulario] = useState({
    ruta: "",
    vehiculo: "",
    operador: "",
    fecha: "",
    hora: "",
    estado: "Programada",
  });

  function cambiarDato(evento) {
    const { name, value } = evento.target;

    setFormulario({
      ...formulario,
      [name]: value,
    });
  }

  function guardarAsignacion(evento) {
    evento.preventDefault();

    if (
      formulario.ruta === "" ||
      formulario.vehiculo === "" ||
      formulario.operador === "" ||
      formulario.fecha === ""
    ) {
      alert("Completa los campos obligatorios.");
      return;
    }

    console.log(formulario);

    alert("Asignación registrada correctamente.");

    router.push("/asignaciones");
  }

  return (
    <main className="pagina">
      <div className="encabezadoFormulario">
        <div>
          <h1>Nueva Asignación</h1>
          <p>
            Asigna una ruta, un vehículo y un operador a un servicio.
          </p>
        </div>
      </div>

      <section className="formularioContenedor">
        <form onSubmit={guardarAsignacion} className="formulario">

          <div className="campo">
            <label>Ruta *</label>

            <select
              name="ruta"
              value={formulario.ruta}
              onChange={cambiarDato}
            >
              <option value="">Selecciona una ruta</option>
              <option value="Villahermosa - Cárdenas">
                Villahermosa - Cárdenas
              </option>
              <option value="Villahermosa - Macuspana">
                Villahermosa - Macuspana
              </option>
              <option value="Villahermosa - Comalcalco">
                Villahermosa - Comalcalco
              </option>
            </select>
          </div>

          <div className="filaFormulario">

            <div className="campo">
              <label>Vehículo *</label>

              <select
                name="vehiculo"
                value={formulario.vehiculo}
                onChange={cambiarDato}
              >
                <option value="">Selecciona un vehículo</option>
                <option value="TB-2456-A">
                  TB-2456-A
                </option>
                <option value="TB-7788-B">
                  TB-7788-B
                </option>
              </select>
            </div>

            <div className="campo">
              <label>Operador *</label>

              <select
                name="operador"
                value={formulario.operador}
                onChange={cambiarDato}
              >
                <option value="">Selecciona un operador</option>
                <option value="Juan Pérez López">
                  Juan Pérez López
                </option>
                <option value="Carlos Hernández Ruiz">
                  Carlos Hernández Ruiz
                </option>
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
              <option value="Programada">Programada</option>
              <option value="En ruta">En ruta</option>
              <option value="Finalizada">Finalizada</option>
              <option value="Cancelada">Cancelada</option>
            </select>
          </div>

          <div className="botonesFormulario">

            <button
              type="button"
              className="botonCancelar"
              onClick={() => router.push("/asignaciones")}
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