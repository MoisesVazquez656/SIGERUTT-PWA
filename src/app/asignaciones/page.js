import Link from "next/link";

export default function Asignaciones() {
  return (
    <main className="pagina">
      <div className="encabezadoPagina">
        <div>
          <h1>Gestión de Asignaciones</h1>
          <p>
            Relaciona rutas, vehículos y operadores para organizar los servicios de transporte.
          </p>
        </div>

        <Link href="/asignaciones/nueva" className="botonPrincipal">
          + Nueva asignación
        </Link>
      </div>

      <section className="contenido">
        <div className="busqueda">
          <input
            type="text"
            placeholder="Buscar asignación..."
          />

          <button>Buscar</button>
        </div>

        <div className="tablaContenedor">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Ruta</th>
                <th>Vehículo</th>
                <th>Operador</th>
                <th>Fecha</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td colSpan="7" className="sinDatos">
                  No hay asignaciones registradas.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}