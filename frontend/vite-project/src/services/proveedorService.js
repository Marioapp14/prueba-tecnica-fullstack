import api from "./api";

// Obtener todos los proveedores
export const getProveedores = () => api.get("/proveedores");

//  Obtener proveedor por ID
export const getProveedor = (id) => api.get(`/proveedores/${id}`);

// Crear proveedor
export const createProveedor = (data) => api.post("/proveedores", data);

//  Actualizar proveedor
export const updateProveedor = (id, data) =>
  api.put(`/proveedores/${id}`, data);

//  Eliminar proveedor
export const deleteProveedor = (id) =>
  api.delete(`/proveedores/${id}`);