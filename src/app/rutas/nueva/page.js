"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NuevaRuta() {
  const router = useRouter();

  const [formulario, setFormulario] = useState({
    nombre: "",
    origen: "",
    destino: "",
    distancia: "",
    estado: "Activa",
  });

  function cambiarDato(evento) {
    const { name, value } = evento.target;

    setFormulario({
      ...formulario,
      [name]: value,
    });
  }

  function guardarRuta(evento) {
    evento.preventDefault();

    if (
      formulario.nombre === "" ||
      formulario.origen === "" ||
      formulario.destino === ""
    ) {
      alert("Completa los campos obligatorios.");
      return;
    }

    alert("Ruta registrada correctamente.");

    console.log(formulario);

    router.push("/rutas");
  }

  return (
    <main className="pagina">
      <div className="encabezadoFormulario">
        <div>
          <h1>Nueva Ruta</h1>
          <p>Registra una nueva ruta de transporte terrestre.</p>
        </div>
      </div>

      <section className="formularioContenedor">
        <form onSubmit={guardarRuta} className="formulario">
          
          <div className="campo">
            <label>Nombre de la ruta *</label>

            <input
              type="text"
              name="nombre"
              value={formulario.nombre}
              onChange={cambiarDato}
              placeholder="Ejemplo: Villahermosa - Cárdenas"
            />
          </div>

          <div className="filaFormulario">
            <div className="campo">
              <label>Origen *</label>

              <input
                type="text"
                name="origen"
                value={formulario.origen}
                onChange={cambiarDato}
                placeholder="Ciudad de origen"
              />
            </div>

            <div className="campo">
              <label>Destino *</label>

              <input
                type="text"
                name="destino"
                value={formulario.destino}
                onChange={cambiarDato}
                placeholder="Ciudad de destino"
              />
            </div>
          </div>

          <div className="filaFormulario">
            <div className="campo">
              <label>Distancia aproximada</label>

              <input
                type="number"
                name="distancia"
                value={formulario.distancia}
                onChange={cambiarDato}
                placeholder="Kilómetros"
              />
            </div>

            <div className="campo">
              <label>Estado</label>

              <select
                name="estado"
                value={formulario.estado}
                onChange={cambiarDato}
              >
                <option value="Activa">Activa</option>
                <option value="Inactiva">Inactiva</option>
                <option value="Mantenimiento">
                  En revisión
                </option>
              </select>
            </div>
          </div>

          <div className="botonesFormulario">
            <button
              type="button"
              className="botonCancelar"
              onClick={() => router.push("/rutas")}
            >
              Cancelar
            </button>

            <button
              type="submit"
              className="botonGuardar"
            >
              Guardar ruta
            </button>
          </div>

        </form>
      </section>
    </main>
  );
}