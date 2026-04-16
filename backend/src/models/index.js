const sequelize = require("../config/database");
const ProductoModel = require("./producto");
const CategoriaModel = require("./categoria");
const ProveedorModel = require("./proveedor");

// Instantiate models
const Producto = ProductoModel(sequelize);
const Categoria = CategoriaModel(sequelize);
const Proveedor = ProveedorModel(sequelize);

// 🔥 RELACIONES
Producto.belongsTo(Categoria, {
  foreignKey: "categoriaId",
  as: "Categoria"
});

Producto.belongsTo(Proveedor, {
  foreignKey: "proveedorId",
  as: "Proveedor"
});

// (Opcional pero recomendado)
Categoria.hasMany(Producto, {
  foreignKey: "categoriaId"
});

Proveedor.hasMany(Producto, {
  foreignKey: "proveedorId"
});

module.exports = {
  sequelize,
  Producto,
  Categoria,
  Proveedor
};