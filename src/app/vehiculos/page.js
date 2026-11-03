import Link from "next/link";

export default function Vehiculos() {
  return (
    <main className="pagina">
      <div className="encabezadoPagina">
        <div>
          <h1>Gestión de Vehículos</h1>
          <p>
            Consulta y administra las unidades de transporte registradas.
          </p>
        </div>

        <Link href="/vehiculos/nuevo" className="botonPrincipal">
          + Nuevo vehículo
        </Link>
      </div>

      <section className="contenido">
        <div className="busqueda">
          <input
            type="text"
            placeholder="Buscar vehículo por placa..."
          />

          <button>Buscar</button>
        </div>

        <div className="tablaContenedor">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Placa</th>
                <th>Tipo</th>
                <th>Marca</th>
                <th>Modelo</th>
                <th>Capacidad</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td colSpan="8" className="sinDatos">
                  No hay vehículos registrados.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}