"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NuevoOperador() {
  const router = useRouter();

  const [formulario, setFormulario] = useState({
    nombre: "",
    licencia: "",
    telefono: "",
    correo: "",
    estado: "Disponible",
  });

  function cambiarDato(evento) {
    const { name, value } = evento.target;

    setFormulario({
      ...formulario,
      [name]: value,
    });
  }

  function guardarOperador(evento) {
    evento.preventDefault();

    if (
      formulario.nombre === "" ||
      formulario.licencia === "" ||
      formulario.telefono === ""
    ) {
      alert("Completa los campos obligatorios.");
      return;
    }

    console.log(formulario);

    alert("Operador registrado correctamente.");

    router.push("/operadores");
  }

  return (
    <main className="pagina">
      <div className="encabezadoFormulario">
        <div>
          <h1>Nuevo Operador</h1>
          <p>Registra un nuevo operador de transporte.</p>
        </div>
      </div>

      <section className="formularioContenedor">
        <form onSubmit={guardarOperador} className="formulario">

          <div className="campo">
            <label>Nombre completo *</label>

            <input
              type="text"
              name="nombre"
              value={formulario.nombre}
              onChange={cambiarDato}
              placeholder="Nombre del operador"
            />
          </div>

          <div className="filaFormulario">

            <div className="campo">
              <label>Número de licencia *</label>

              <input
                type="text"
                name="licencia"
                value={formulario.licencia}
                onChange={cambiarDato}
                placeholder="Ejemplo: LIC-123456"
              />
            </div>

            <div className="campo">
              <label>Teléfono *</label>

              <input
                type="tel"
                name="telefono"
                value={formulario.telefono}
                onChange={cambiarDato}
                placeholder="Ejemplo: 9931234567"
              />
            </div>

          </div>

          <div className="filaFormulario">

            <div className="campo">
              <label>Correo electrónico</label>

              <input
                type="email"
                name="correo"
                value={formulario.correo}
                onChange={cambiarDato}
                placeholder="operador@correo.com"
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
                <option value="Descanso">Descanso</option>
                <option value="Inactivo">Inactivo</option>
              </select>
            </div>

          </div>

          <div className="botonesFormulario">

            <button
              type="button"
              className="botonCancelar"
              onClick={() => router.push("/operadores")}
            >
              Cancelar
            </button>

            <button
              type="submit"
              className="botonGuardar"
            >
              Guardar operador
            </button>

          </div>

        </form>
      </section>
    </main>
  );
}