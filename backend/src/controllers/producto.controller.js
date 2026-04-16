const { Producto, Categoria, Proveedor } = require("../models");

exports.getAll = async (req, res) => {
  try {
    const productos = await Producto.findAll({
      include: [
        {
          model: Categoria,
          as: "Categoria",
          attributes: ["id", "nombre"]
        },
        {
          model: Proveedor,
          as: "Proveedor",
          attributes: ["id", "nombre"]
        }
      ]
    });

    res.json(productos);

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error al obtener productos"
    });
  }
};


exports.getById = async (req, res) => {
  try {
    const { id } = req.params;

    const producto = await Producto.findByPk(id, {
      include: [
        { model: Categoria, as: "Categoria" },
        { model: Proveedor, as: "Proveedor" }
      ]
    });

    if (!producto) {
      return res.status(404).json({
        message: "Producto no encontrado"
      });
    }

    res.json(producto);

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error al obtener producto"
    });
  }
};


exports.create = async (req, res) => {
  try {
    const { nombre, precio, categoriaId, proveedorId } = req.body;

    const nuevo = await Producto.create({
      nombre,
      precio,
      categoriaId,
      proveedorId
    });

    console.log(req.body);
    res.json(nuevo);

  } catch (err) {

    // 🔥 VALIDACIONES DE SEQUELIZE
    if (err.name === "SequelizeValidationError") {
      const errores = err.errors.map(e => e.message);
      return res.status(400).json({ errores });
    }

    console.error(err);
    res.status(500).json({
      error: "Error al crear producto"
    });
  }
};


exports.update = async (req, res) => {
  try {
    const { id } = req.params;

    const producto = await Producto.findByPk(id);

    if (!producto) {
      return res.status(404).json({
        message: "Producto no encontrado"
      });
    }

    await Producto.update(req.body, { where: { id } });

    res.json({ message: "Actualizado" });

  } catch (err) {

    if (err.name === "SequelizeValidationError") {
      const errores = err.errors.map(e => e.message);
      return res.status(400).json({ errores });
    }

    console.error(err);
    res.status(500).json({
      error: "Error al actualizar producto"
    });
  }
};


exports.remove = async (req, res) => {
  try {
    const { id } = req.params;

    const producto = await Producto.findByPk(id);

    if (!producto) {
      return res.status(404).json({
        message: "Producto no encontrado"
      });
    }

    await Producto.destroy({ where: { id } });

    res.json({ message: "Eliminado" });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Error al eliminar producto"
    });
  }
};