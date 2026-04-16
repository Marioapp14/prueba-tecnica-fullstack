import { useState, useEffect } from "react";
import { getCategorias } from "../services/categoriaService";
import { getProveedores } from "../services/proveedorService";

function ProductoModal({ isOpen, onClose, onSave, producto }) {
  const [form, setForm] = useState({
    nombre: "",
    precio: "",
    categoriaId: "",
    proveedorId: ""
  });

  const [categorias, setCategorias] = useState([]);
  const [proveedores, setProveedores] = useState([]);

  // Cargar categorías y proveedores
  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const resCat = await getCategorias();
        const resProv = await getProveedores();

        setCategorias(resCat.data);
        setProveedores(resProv.data);
      } catch (error) {
        console.error("Error cargando datos:", error);
      }
    };

    cargarDatos();
  }, []);

  //  Cargar datos si es edición
  useEffect(() => {
    if (producto) {
      setForm({
        nombre: producto.nombre || "",
        precio: producto.precio || "",
        categoriaId: producto.categoriaId || "",
        proveedorId: producto.proveedorId || ""
      });
    } else {
      setForm({
        nombre: "",
        precio: "",
        categoriaId: "",
        proveedorId: ""
      });
    }
  }, [producto]);

  //  Manejo de inputs
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  //  Guardar
  const handleSubmit = () => {
    console.log("CLICK DETECTADO 🔥");

    if (!form.nombre || !form.precio || !form.categoriaId || !form.proveedorId) {
      alert("Todos los campos son obligatorios");
      return;
    }

    const data = {
      ...form,
      precio: Number(form.precio),
      categoriaId: Number(form.categoriaId),
      proveedorId: Number(form.proveedorId)
    };

    console.log("DATA ENVIADA:", data);

    onSave(data);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <h3>{producto ? " Editar" : " Crear"} Producto</h3>

        {/* Nombre */}
        <input
          className="input"
          name="nombre"
          placeholder="Nombre"
          value={form.nombre}
          onChange={handleChange}
        />

        {/* Precio */}
        <input
          className="input"
          name="precio"
          type="number"
          placeholder="Precio"
          value={form.precio}
          onChange={handleChange}
        />

        {/* Categoría */}
        <select
          className="input"
          name="categoriaId"
          value={form.categoriaId}
          onChange={handleChange}
        >
          <option value="">Seleccione categoría</option>
          {categorias.map((c) => (
            <option key={c.id} value={c.id}>
              {c.nombre}
            </option>
          ))}
        </select>

        {/* Proveedor */}
        <select
          className="input"
          name="proveedorId"
          value={form.proveedorId}
          onChange={handleChange}
        >
          <option value="">Seleccione proveedor</option>
          {proveedores.map((p) => (
            <option key={p.id} value={p.id}>
              {p.nombre}
            </option>
          ))}
        </select>

        {/* Botones */}
        <div style={{ marginTop: "10px", display: "flex", gap: "10px" }}>
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleSubmit}
          >
            Guardar
          </button>

          <button type="button" className="btn" onClick={onClose}>
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductoModal;