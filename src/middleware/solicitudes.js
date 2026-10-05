// src/middleware/solicitudes.js

let contador = 1;

// Middleware para identificar cada solicitud
function identificarSolicitud(req, res, next) {
  const id = String(contador).padStart(4, "0");
  res.locals.solicitudId = `BIB-${id}`;
  contador++;
  next();
}

// Middleware para medir la duración de cada solicitud
function medirDuracion(req, res, next) {
  const inicio = Date.now();

  res.on("finish", () => {
    const duracion = Date.now() - inicio;
    console.log(
      `${res.locals.solicitudId} | ${req.method} ${req.originalUrl} | ${res.statusCode} | ${duracion}ms`
    );
  });

  next();
}

module.exports = { identificarSolicitud, medirDuracion };
