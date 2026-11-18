"use client";

import { useRouter } from "next/navigation";
import { createClient } from "../lib/supabaseClient";

export default function Logout() {
  const router = useRouter();

  async function cerrarSesion() {
    const supabase = createClient();

    await supabase.auth.signOut();

    router.push("/login");
    router.refresh();
  }

  return (
    <button
      className="botonCerrarSesion"
      onClick={cerrarSesion}
    >
      Cerrar sesión
    </button>
  );
}