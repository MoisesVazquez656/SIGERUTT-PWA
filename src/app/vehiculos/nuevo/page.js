"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NuevoVehiculo() {
  const router = useRouter();

  const [formulario, setFormulario] = useState({
    placa: "",
    tipo: "",
    marca: "",
    modelo: "",
    capacidad: "",
    estado: "Disponible",
  });

  function cambiarDato(evento) {
    const { name, value } = evento.target;

    setFormulario({
      ...formulario,
      [name]: value,
    });
  }

  function guardarVehiculo(evento) {
    evento.preventDefault();

    if (
      formulario.placa === "" ||
      formulario.tipo === "" ||
      formulario.marca === ""
    ) {
      alert("Completa los campos obligatorios.");
      return;
    }

    console.log(formulario);

    alert("Vehículo registrado correctamente.");

    router.push("/vehiculos");
  }

  return (
    <main className="pagina">
      <div className="encabezadoFormulario">
        <div>
          <h1>Nuevo Vehículo</h1>
          <p>Registra una nueva unidad de transporte.</p>
        </div>
      </div>

      <section className="formularioContenedor">
        <form onSubmit={guardarVehiculo} className="formulario">

          <div className="filaFormulario">

            <div className="campo">
              <label>Placa *</label>

              <input
                type="text"
                name="placa"
                value={formulario.placa}
                onChange={cambiarDato}
                placeholder="Ejemplo: AB-123-CD"
              />
            </div>

            <div className="campo">
              <label>Tipo de vehículo *</label>

              <select
                name="tipo"
                value={formulario.tipo}
                onChange={cambiarDato}
              >
                <option value="">Selecciona una opción</option>
                <option value="Camión">Camión</option>
                <option value="Camioneta">Camioneta</option>
                <option value="Tráiler">Tráiler</option>
                <option value="Van">Van</option>
              </select>
            </div>

          </div>

          <div className="filaFormulario">

            <div className="campo">
              <label>Marca *</label>

              <input
                type="text"
                name="marca"
                value={formulario.marca}
                onChange={cambiarDato}
                placeholder="Ejemplo: Freightliner"
              />
            </div>

            <div className="campo">
              <label>Modelo</label>

              <input
                type="text"
                name="modelo"
                value={formulario.modelo}
                onChange={cambiarDato}
                placeholder="Ejemplo: Cascadia"
              />
            </div>

          </div>

          <div className="filaFormulario">

            <div className="campo">
              <label>Capacidad de carga</label>

              <input
                type="text"
                name="capacidad"
                value={formulario.capacidad}
                onChange={cambiarDato}
                placeholder="Ejemplo: 10 toneladas"
              />
            </div>

            <div className="campo">
              <label>Estado</label>

              <select
                name="estado"
                value={formulario.estado}
                onChange={cambiarDato}
              >
                <option value="Disponible">Disponible</option>
                <option value="Asignado">Asignado</option>
                <option value="Mantenimiento">Mantenimiento</option>
                <option value="Fuera de servicio">Fuera de servicio</option>
              </select>
            </div>

          </div>

          <div className="botonesFormulario">

            <button
              type="button"
              className="botonCancelar"
              onClick={() => router.push("/vehiculos")}
            >
              Cancelar
            </button>

            <button
              type="submit"
              className="botonGuardar"
            >
              Guardar vehículo
            </button>

          </div>

        </form>
      </section>
    </main>
  );
}