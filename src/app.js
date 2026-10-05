// src/app.js
const express = require("express");
const morgan = require("morgan");
const expressLayouts = require("express-ejs-layouts");
const path = require("path");

const { identificarSolicitud, medirDuracion } = require("./middleware/solicitudes");
const { crearRouterReservas } = require("./rutas/reservas");

function crearApp(servicioReservas, config) {
  const app = express();

  // Motor de vistas y layouts
  app.set("view engine", "ejs");
  app.set("layout", "layouts/main");
  app.set("views", path.join(__dirname, "..", "views"));

  // Pipeline global en orden correcto
  app.use(morgan(config.formatoRegistro));
  app.use(identificarSolicitud);
  app.use(medirDuracion);
  app.use(expressLayouts);
  app.use(express.static(path.join(__dirname, "..", "public")));
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  // Montar router de reservas
  const controladorReservas = require("./controladores/reservas").crearControladorReservas(servicioReservas);
  app.use("/reservas", crearRouterReservas(controladorReservas));

  // Rutas adicionales
  app.get("/", controladorReservas.inicio);
  app.get("/estado", controladorReservas.estado);

  // Middleware final 404
  app.use((req, res) => {
    res.status(404).render("no-encontrado", {
      titulo: "Página no encontrada",
      mensaje: "La dirección solicitada no existe."
    });
  });

  return app;
}

module.exports = { crearApp };
