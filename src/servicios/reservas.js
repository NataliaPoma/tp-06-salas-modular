// src/servicios/reservas.js

function crearServicioReservas(datosIniciales) {
  // Copia en memoria de las reservas iniciales
  const reservas = [...datosIniciales];

  // Listar todas las reservas
  function listar() {
    return [...reservas];
  }

  // Buscar una reserva por ID
  function buscarPorId(id) {
    return reservas.find(r => r.id === id) ?? null;
  }

  // Contar reservas existentes
  function contar() {
    return reservas.length;
  }

  // Crear una nueva reserva
  function crear(datos) {
    const nueva = {
      id: reservas.length + 1,
      ...datos
    };
    reservas.push(nueva);
    return nueva;
  }

  return { listar, buscarPorId, contar, crear };
}

module.exports = { crearServicioReservas };
