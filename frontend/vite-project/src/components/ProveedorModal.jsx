import { useState, useEffect } from "react";

function ProveedorModal({ isOpen, onClose, onSave, proveedor }) {
  const [form, setForm] = useState({
    nombre: "",
    contacto: ""
  });

  useEffect(() => {
    if (proveedor) {
      setForm({
        nombre: proveedor.nombre || "",
        contacto: proveedor.contacto || ""
      });
    } else {
      setForm({
        nombre: "",
        contacto: ""
      });
    }
  }, [proveedor]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = () => {
    if (!form.nombre || !form.contacto) {
      alert("Todos los campos son obligatorios");
      return;
    }

    console.log("PROVEEDOR:", form);

    onSave(form);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <h3>{proveedor ? " Editar" : "Crear"} Proveedor</h3>

        <input
          className="input"
          name="nombre"
          placeholder="Nombre"
          value={form.nombre}
          onChange={handleChange}
        />

        <input
          className="input"
          name="contacto"
          placeholder="Contacto"
          value={form.contacto}
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

export default ProveedorModal;