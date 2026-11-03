import Link from "next/link";

export default function Rutas() {
  return (
    <main className="pagina">
      <div className="encabezadoPagina">
        <div>
          <h1>Gestión de Rutas</h1>
          <p>
            Consulta, registra y administra las rutas de transporte terrestre.
          </p>
        </div>

        <Link href="/rutas/nueva" className="botonPrincipal">
          + Nueva ruta
        </Link>
      </div>

      <section className="contenido">
        <div className="busqueda">
          <input
            type="text"
            placeholder="Buscar ruta..."
          />

          <button>Buscar</button>
        </div>

        <div className="tablaContenedor">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Ruta</th>
                <th>Origen</th>
                <th>Destino</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td colSpan="6" className="sinDatos">
                  No hay rutas registradas.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}