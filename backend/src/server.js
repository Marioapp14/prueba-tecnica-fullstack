const app = require("./app");
const { sequelize } = require("./models");
require("dotenv").config();

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    await sequelize.authenticate();
    console.log("✅ Conexión a DB exitosa");

    await sequelize.sync({ alter: true });
    console.log(" Tablas sincronizadas");

    app.listen(PORT, () => {
      console.log(` Servidor en http://localhost:${PORT}`);
    });

  } catch (error) {
    console.error(" Error al iniciar servidor:", error);
  }
}

startServer();