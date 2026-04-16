import { useEffect, useState } from "react";
import {
  getProveedores,
  createProveedor,
  updateProveedor,
  deleteProveedor
} from "../services/proveedorService";
import ProveedorModal from "../components/ProveedorModal";

function Proveedores() {
  const [proveedores, setProveedores] = useState([]);
  const [filtro, setFiltro] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [proveedorEdit, setProveedorEdit] = useState(null);

  const cargarProveedores = async () => {
    const res = await getProveedores();
    setProveedores(res.data);
  };

  useEffect(() => {
    cargarProveedores();
  }, []);

  const handleSave = async (data) => {
    if (proveedorEdit) {
      await updateProveedor(proveedorEdit.id, data);
    } else {
      await createProveedor(data);
    }
    cargarProveedores();
  };

  const handleDelete = async (id) => {
    if (confirm("¿Eliminar proveedor?")) {
      await deleteProveedor(id);
      cargarProveedores();
    }
  };

  const handleEdit = (proveedor) => {
    setProveedorEdit(proveedor);
    setModalOpen(true);
  };

  const handleCreate = () => {
    setProveedorEdit(null);
    setModalOpen(true);
  };

  const proveedoresFiltrados = proveedores.filter((p) =>
    p.nombre.toLowerCase().includes(filtro.toLowerCase())
  );

  return (
    <div className="container">
      <h2>Proveedores</h2>

      <input
        className="search"
        placeholder="Buscar proveedor..."
        value={filtro}
        onChange={(e) => setFiltro(e.target.value)}
      />

      <button className="btn btn-primary" onClick={handleCreate}>
      Crear Proveedor
      </button>

      <div className="card">
        <table className="table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Contacto</th>
              <th>Acciones</th>
            </tr>
          </thead>

          <tbody>
            {proveedoresFiltrados.map((p) => (
              <tr key={p.id}>
                <td>{p.nombre}</td>
                <td>{p.contacto}</td>
                <td>
                  <button
                    className="btn btn-edit"
                    onClick={() => handleEdit(p)}
                  >
                    Editar
                  </button>

                  <button
                    className="btn btn-delete"
                    onClick={() => handleDelete(p.id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ProveedorModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
        proveedor={proveedorEdit}
      />
    </div>
  );
}

export default Proveedores;