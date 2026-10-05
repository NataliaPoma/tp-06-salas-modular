// src/rutas/reservas.js
const express = require("express");
const { prepararSeccion, validarReserva } = require("../middleware/reservas");

function crearRouterReservas(controlador) {
  const router = express.Router();

  // Middleware de sección
  router.use(prepararSeccion);

  // Listado de reservas
  router.get("/", controlador.listar);

  // Formulario nueva reserva (debe ir antes de :id)
  router.get("/nueva", controlador.formulario);

  // Detalle de reserva
  router.get("/:id", controlador.detalle);

  // Crear nueva reserva con validación
  router.post("/", validarReserva, controlador.crear);

  return router;
}

module.exports = { crearRouterReservas };
