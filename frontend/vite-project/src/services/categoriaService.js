import api from "./api";

// Obtener todas las categorías
export const getCategorias = () => api.get("/categorias");

// Obtener una categoría por ID
export const getCategoria = (id) => api.get(`/categorias/${id}`);

// Crear categoría
export const createCategoria = (data) => api.post("/categorias", data);

// Actualizar categoría
export const updateCategoria = (id, data) =>
  api.put(`/categorias/${id}`, data);

// Eliminar categoría
export const deleteCategoria = (id) =>
  api.delete(`/categorias/${id}`);