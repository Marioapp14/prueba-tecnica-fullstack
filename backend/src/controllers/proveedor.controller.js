const { Proveedor } = require("../models");

exports.getAll = async (req, res) => {
  try {
    const proveedores = await Proveedor.findAll();
    res.json(proveedores);

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error al obtener proveedores"
    });
  }
};


exports.getById = async (req, res) => {
  try {
    const { id } = req.params;

    const proveedor = await Proveedor.findByPk(id);

    if (!proveedor) {
      return res.status(404).json({
        message: "Proveedor no encontrado"
      });
    }

    res.json(proveedor);

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error al obtener proveedor"
    });
  }
};


exports.create = async (req, res) => {
  try {
    const nuevo = await Proveedor.create(req.body);
    res.json(nuevo);

  } catch (err) {

    if (err.name === "SequelizeValidationError") {
      const errores = err.errors.map(e => e.message);
      return res.status(400).json({ errores });
    }

    console.error(err);
    res.status(500).json({
      error: "Error al crear proveedor"
    });
  }
};


exports.update = async (req, res) => {
  try {
    const { id } = req.params;

    const proveedor = await Proveedor.findByPk(id);

    if (!proveedor) {
      return res.status(404).json({
        message: "Proveedor no encontrado"
      });
    }

    await Proveedor.update(req.body, { where: { id } });

    res.json({ message: "Actualizado" });

  } catch (err) {

    if (err.name === "SequelizeValidationError") {
      const errores = err.errors.map(e => e.message);
      return res.status(400).json({ errores });
    }

    console.error(err);
    res.status(500).json({
      error: "Error al actualizar proveedor"
    });
  }
};


exports.remove = async (req, res) => {
  try {
    const { id } = req.params;

    const proveedor = await Proveedor.findByPk(id);

    if (!proveedor) {
      return res.status(404).json({
        message: "Proveedor no encontrado"
      });
    }

    await Proveedor.destroy({ where: { id } });

    res.json({ message: "Eliminado" });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Error al eliminar proveedor"
    });
  }
};