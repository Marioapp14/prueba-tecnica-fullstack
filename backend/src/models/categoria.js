module.exports = (sequelize) => {
  const { DataTypes } = require("sequelize");

  return sequelize.define("Categoria", {
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