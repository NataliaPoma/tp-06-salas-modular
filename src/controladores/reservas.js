// src/controladores/reservas.js

function crearControladorReservas(servicio) {
  return {
    // Página de inicio
    inicio(req, res) {
      res.render("inicio");
    },

    // Estado del servicio en JSON
    estado(req, res) {
      res.json({
        servicio: "activo",
        reservas: servicio.contar(),
        solicitudId: res.locals.solicitudId
      });
    },

    // Listado de reservas
    listar(req, res) {
      res.render("reservas/lista", {
        seccion: "Reservas de salas",
        reservas: servicio.listar()
      });
    },

    // Formulario de nueva reserva
    formulario(req, res) {
      res.render("reservas/nueva", {
        seccion: "Reservas de salas",
        salasPermitidas: ["Sala Norte", "Sala Sur", "Sala Multimedia"],
        errores: [],
        valores: {}
      });
    },

    // Detalle de una reserva
    detalle(req, res) {
      const id = Number.parseInt(req.params.id);
      const reserva = servicio.buscarPorId(id);

      if (!reserva) {
        return res.status(404).render("no-encontrado", {
          titulo: "Reserva no encontrada",
          mensaje: "La reserva solicitada no existe."
        });
      }

      res.render("reservas/detalle", {
        seccion: "Reservas de salas",
        reserva
      });
    },

    // Crear una nueva reserva
    crear(req, res) {
      servicio.crear(req.reservaValidada);
      res.redirect("/reservas");
    }
  };
}

module.exports = { crearControladorReservas };
