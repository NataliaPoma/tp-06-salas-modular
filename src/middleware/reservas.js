// src/middleware/reservas.js

// Salas válidas para las reservas
const salasPermitidas = ["Sala Norte", "Sala Sur", "Sala Multimedia"];

// Middleware para preparar la sección
function prepararSeccion(req, res, next) {
  res.locals.seccion = "Reservas de salas";
  next();
}

// Middleware de validación de reservas
function validarReserva(req, res, next) {
  const { estudiante, email, sala, fecha, turno, personas } = req.body;

  const datos = {
    estudiante: estudiante?.trim(),
    email: email?.trim(),
    sala: sala?.trim(),
    fecha: fecha?.trim(),
    turno: turno?.trim(),
    personas: Number(personas)
  };

  const errores = [];

  if (!datos.estudiante) {
    errores.push("Debes ingresar el nombre del estudiante.");
  }
  if (!datos.email) {
    errores.push("Debes ingresar un email.");
  } else if (!datos.email.includes("@")) {
    errores.push("El email debe contener '@'.");
  }
  if (!datos.fecha) {
    errores.push("Debes ingresar una fecha.");
  }
  if (!salasPermitidas.includes(datos.sala)) {
    errores.push("La sala seleccionada no es válida.");
  }
  if (!["Mañana", "Tarde", "Noche"].includes(datos.turno)) {
    errores.push("El turno debe ser Mañana, Tarde o Noche.");
  }
  if (!Number.isInteger(datos.personas)) {
    errores.push("La cantidad de personas debe ser un número entero.");
  } else if (datos.personas < 1 || datos.personas > 6) {
    errores.push("La cantidad de personas debe ser entre 1 y 6.");
  }

  if (errores.length > 0) {
    return res.status(400).render("reservas/nueva", {
      seccion: "Reservas de salas",
      salasPermitidas,
      errores,
      valores: datos
    });
  }

  req.reservaValidada = datos;
  next();
}

module.exports = { prepararSeccion, validarReserva };
