const { Categoria } = require("../models");

exports.getAll = async (req, res) => {
  try {
    const categorias = await Categoria.findAll();
    res.json(categorias);

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error al obtener categorías"
    });
  }
};


exports.getById = async (req, res) => {
  try {
    const { id } = req.params;

    const categoria = await Categoria.findByPk(id);

    if (!categoria) {
      return res.status(404).json({
        message: "Categoría no encontrada"
      });
    }

    res.json(categoria);

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error al obtener categoría"
    });
  }
};


exports.create = async (req, res) => {
  try {
    const nueva = await Categoria.create(req.body);
    res.json(nueva);

  } catch (err) {

    if (err.name === "SequelizeValidationError") {
      const errores = err.errors.map(e => e.message);
      return res.status(400).json({ errores });
    }

    console.error(err);
    res.status(500).json({
      error: "Error al crear categoría"
    });
  }
};


exports.update = async (req, res) => {
  try {
    const { id } = req.params;

    const categoria = await Categoria.findByPk(id);

    if (!categoria) {
      return res.status(404).json({
        message: "Categoría no encontrada"
      });
    }

    await Categoria.update(req.body, { where: { id } });

    res.json({ message: "Actualizada" });

  } catch (err) {

    if (err.name === "SequelizeValidationError") {
      const errores = err.errors.map(e => e.message);
      return res.status(400).json({ errores });
    }

    console.error(err);
    res.status(500).json({
      error: "Error al actualizar categoría"
    });
  }
};


exports.remove = async (req, res) => {
  try {
    const { id } = req.params;

    const categoria = await Categoria.findByPk(id);

    if (!categoria) {
      return res.status(404).json({
        message: "Categoría no encontrada"
      });
    }

    await Categoria.destroy({ where: { id } });

    res.json({ message: "Eliminada" });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Error al eliminar categoría"
    });
  }
};