// src/configuracion.js

function leerConfiguracion(env = process.env) {
  // Puerto: por defecto 3000, validado
  const PORT = Number(env.PORT ?? 3000);

  if (!Number.isInteger(PORT) || PORT < 1 || PORT > 65535) {
    throw new Error(`Valor de puerto inválido: ${env.PORT}`);
  }

  // Formato de registro para Morgan
  const formatoRegistro = env.NODE_ENV === "production" ? "combined" : "dev";

  return { PORT, formatoRegistro };
}

module.exports = { leerConfiguracion };
