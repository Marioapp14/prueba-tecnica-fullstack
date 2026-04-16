import { useEffect, useState } from "react";
import {
  getCategorias,
  createCategoria,
  updateCategoria,
  deleteCategoria
} from "../services/categoriaService";
import CategoriaModal from "../components/CategoriaModal";

function Categorias() {
  const [categorias, setCategorias] = useState([]);
  const [filtro, setFiltro] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [categoriaEdit, setCategoriaEdit] = useState(null);

  const cargarCategorias = async () => {
    const res = await getCategorias();
    setCategorias(res.data);
  };

  useEffect(() => {
    cargarCategorias();
  }, []);

  const handleSave = async (data) => {
    if (categoriaEdit) {
      await updateCategoria(categoriaEdit.id, data);
    } else {
      await createCategoria(data);
    }
    cargarCategorias();
  };

  const handleDelete = async (id) => {
    if (confirm("¿Eliminar categoría?")) {
      await deleteCategoria(id);
      cargarCategorias();
    }
  };

  const handleEdit = (categoria) => {
    setCategoriaEdit(categoria);
    setModalOpen(true);
  };

  const handleCreate = () => {
    setCategoriaEdit(null);
    setModalOpen(true);
  };

  const categoriasFiltradas = categorias.filter((c) =>
    c.nombre.toLowerCase().includes(filtro.toLowerCase())
  );

  return (
    <div className="container">
      <h2> Categorías</h2>

      <input
        className="search"
        placeholder="Buscar categoría..."
        value={filtro}
        onChange={(e) => setFiltro(e.target.value)}
      />

      <button className="btn btn-primary" onClick={handleCreate}>
        Crear Categoría
      </button>

      <div className="card">
        <table className="table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Acciones</th>
            </tr>
          </thead>

          <tbody>
            {categoriasFiltradas.map((c) => (
              <tr key={c.id}>
                <td>{c.nombre}</td>
                <td>
                  <button
                    className="btn btn-edit"
                    onClick={() => handleEdit(c)}
                  >
                    Editar
                  </button>

                  <button
                    className="btn btn-delete"
                    onClick={() => handleDelete(c.id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <CategoriaModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
        categoria={categoriaEdit}
      />
    </div>
  );
}

export default Categorias;