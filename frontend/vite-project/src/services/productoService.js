import api from "./api";

//  Obtener todos los productos
export const getProductos = () => api.get("/productos");

//  Obtener uno por ID
export const getProducto = (id) => api.get(`/productos/${id}`);

//  Crear producto
export const createProducto = (data) => api.post("/productos", data);

//  Actualizar producto
export const updateProducto = (id, data) =>
  api.put(`/productos/${id}`, data);

//  Eliminar producto
export const deleteProducto = (id) =>
  api.delete(`/productos/${id}`);