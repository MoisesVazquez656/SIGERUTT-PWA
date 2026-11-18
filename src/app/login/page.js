"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "../lib/supabaseClient";

export default function Login() {
  const router = useRouter();

  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [cargando, setCargando] = useState(false);

  async function iniciarSesion(e) {
    e.preventDefault();

    setCargando(true);
    setMensaje("");

    const supabase = createClient();

    const { error } =
      await supabase.auth.signInWithPassword({
        email: correo,
        password,
      });

    if (error) {
      setMensaje(
        "El correo o la contraseña son incorrectos."
      );

      setCargando(false);
      return;
    }

    router.push("/");
    router.refresh();
  }

  return (
    <main className="loginPagina">

      <section className="loginPresentacion">

        <div className="loginMarca">
          SIGERUTT
        </div>

        <h1>
          Gestión de transporte
          <span> simple y organizada.</span>
        </h1>

        <p>
          Plataforma para administrar rutas, vehículos,
          operadores y servicios de transporte terrestre.
        </p>

        <div className="loginCaracteristicas">

          <div>
            <strong>Rutas</strong>
            <span>Control de recorridos</span>
          </div>

          <div>
            <strong>Vehículos</strong>
            <span>Gestión de unidades</span>
          </div>

          <div>
            <strong>Operadores</strong>
            <span>Control del personal</span>
          </div>

        </div>

      </section>

      <section className="loginLadoFormulario">

        <div className="loginCaja">

          <div className="loginEncabezado">
            <span className="loginMiniLogo">S</span>

            <h2>Bienvenido</h2>

            <p>
              Ingresa tus datos para acceder a SIGERUTT.
            </p>
          </div>

          <form onSubmit={iniciarSesion}>

            <div className="loginCampo">
              <label>Correo electrónico</label>

              <input
                type="email"
                value={correo}
                onChange={(e) =>
                  setCorreo(e.target.value)
                }
                placeholder="usuario@correo.com"
                required
              />
            </div>

            <div className="loginCampo">
              <label>Contraseña</label>

              <input
                type="password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                placeholder="Ingresa tu contraseña"
                required
              />
            </div>

            <button
              type="submit"
              className="loginBoton"
              disabled={cargando}
            >
              {cargando
                ? "Iniciando sesión..."
                : "Iniciar sesión"}
            </button>

            {mensaje && (
              <div className="loginError">
                {mensaje}
              </div>
            )}

          </form>

          <p className="loginPie">
            Sistema de Gestión de Rutas de Transporte
            Terrestre
          </p>

        </div>

      </section>

    </main>
  );
}