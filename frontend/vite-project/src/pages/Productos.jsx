import { useEffect, useState } from "react";
import {
  getProductos,
  createProducto,
  updateProducto,
  deleteProducto
} from "../services/productoService";
import ProductoModal from "../components/ProductoModal";

function Productos() {
  const [productos, setProductos] = useState([]);
  const [filtro, setFiltro] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [productoEdit, setProductoEdit] = useState(null);

  const cargarProductos = async () => {
    try {
      const res = await getProductos();
      
      setProductos(res.data);
    } catch (error) {
      console.error("Error cargando productos:", error);
    }
  };

  useEffect(() => {
    cargarProductos();
  }, []);

  const handleSave = async (data) => {
    try {
      if (productoEdit) {
        await updateProducto(productoEdit.id, data);
      } else {
        await createProducto(data);
      }
      cargarProductos();
    } catch (error) {
      console.error("Error guardando producto:", error);
    }
  };

  const handleDelete = async (id) => {
    if (confirm("¿Eliminar producto?")) {
      await deleteProducto(id);
      cargarProductos();
    }
  };

  const handleEdit = (producto) => {
    setProductoEdit(producto);
    setModalOpen(true);
  };

  const handleCreate = () => {
    setProductoEdit(null);
    setModalOpen(true);
  };

  const productosFiltrados = productos.filter((p) =>
    p.nombre.toLowerCase().includes(filtro.toLowerCase())
  );

  return (
    <div className="container">
      <h2> Productos</h2>

      {/*  Buscador */}
      <input
        className="search"
        placeholder="Buscar producto..."
        value={filtro}
        onChange={(e) => setFiltro(e.target.value)}
      />

      
      <button className="btn btn-primary" onClick={handleCreate}>
         Crear Producto
      </button>

      {/* Tabla */}
      <div className="card">
        <table className="table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Categoría</th>
              <th>Proveedor</th>
              <th>Acciones</th>
            </tr>
          </thead>

          <tbody>
            {productosFiltrados.map((p) => (
              <tr key={p.id}>
                <td>{p.nombre}</td>
                <td>${p.precio}</td>

               
                <td>{p.Categoria?.nombre || "Sin categoría"}</td>
                <td>{p.Proveedor?.nombre || "Sin proveedor"}</td>

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

      {/* Modal */}
      <ProductoModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
        producto={productoEdit}
      />
    </div>
  );
}

export default Productos;