module.exports = (sequelize) => {
  const { DataTypes } = require("sequelize");

  return sequelize.define("Proveedor", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
};