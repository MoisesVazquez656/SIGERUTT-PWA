import Link from "next/link";

export default function Operadores() {
  return (
    <main className="pagina">
      <div className="encabezadoPagina">
        <div>
          <h1>Gestión de Operadores</h1>
          <p>
            Consulta y administra los operadores registrados en el sistema.
          </p>
        </div>

        <Link href="/operadores/nuevo" className="botonPrincipal">
          + Nuevo operador
        </Link>
      </div>

      <section className="contenido">
        <div className="busqueda">
          <input
            type="text"
            placeholder="Buscar operador por nombre..."
          />

          <button>Buscar</button>
        </div>

        <div className="tablaContenedor">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Licencia</th>
                <th>Teléfono</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td colSpan="6" className="sinDatos">
                  No hay operadores registrados.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}