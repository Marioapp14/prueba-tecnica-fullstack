const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");

const app = express();

// Middlewares base
app.use(cors());
app.use(express.json());

// 🔥 CORREGIDO AQUÍ
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Rutas
app.use("/productos", require("./routes/producto.routes"));
app.use("/categorias", require("./routes/categoria.routes"));
app.use("/proveedores", require("./routes/proveedor.routes"));

// 404
app.use((req, res) => {
  res.status(404).json({
    message: "Ruta no encontrada"
  });
});

// Middleware de errores
app.use((err, req, res, next) => {
  console.error("❌ Error:", err);

  if (err.name === "SequelizeValidationError") {
    const errores = err.errors.map(e => e.message);
    return res.status(400).json({ errores });
  }

  if (err.status) {
    return res.status(err.status).json({
      message: err.message
    });
  }

  res.status(500).json({
    message: "Error interno del servidor"
  });
});

module.exports = app;