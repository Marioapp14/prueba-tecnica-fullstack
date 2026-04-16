import { useState, useEffect } from "react";

function CategoriaModal({ isOpen, onClose, onSave, categoria }) {
  const [form, setForm] = useState({
    nombre: ""
  });

  useEffect(() => {
    if (categoria) {
      setForm({
        nombre: categoria.nombre || ""
      });
    } else {
      setForm({
        nombre: ""
      });
    }
  }, [categoria]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = () => {
    if (!form.nombre) {
      alert("El nombre es obligatorio");
      return;
    }

    onSave(form);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <h3>{categoria ? " Editar" : "Crear"} Categoría</h3>

        <input
          className="input"
          name="nombre"
          placeholder="Nombre"
          value={form.nombre}
          onChange={handleChange}
        />

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

export default CategoriaModal;