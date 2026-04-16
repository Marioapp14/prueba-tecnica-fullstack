module.exports = (sequelize) => {
  const { DataTypes } = require("sequelize");

  return sequelize.define("Producto", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },

    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "El nombre es obligatorio"
        },
        notEmpty: {
          msg: "El nombre no puede estar vacío"
        },
        len: {
          args: [3, 100],
          msg: "El nombre debe tener entre 3 y 100 caracteres"
        }
      }
    },

    precio: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        notNull: {
          msg: "El precio es obligatorio"
        },
        isFloat: {
          msg: "El precio debe ser un número válido"
        },
        min: {
          args: [0],
          msg: "El precio no puede ser negativo"
        }
      }
    },

    categoriaId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "La categoría es obligatoria"
        },
        isInt: {
          msg: "La categoría debe ser un número entero"
        }
      }
    },

    proveedorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "El proveedor es obligatorio"
        },
        isInt: {
          msg: "El proveedor debe ser un número entero"
        }
      }
    }

  });
};