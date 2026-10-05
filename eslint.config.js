// eslint.config.js
const js = require("@eslint/js");

module.exports = [
  js.configs.recommended,
  {
    rules: {
      // Reglas básicas de estilo
      semi: ["error", "always"],          // exige punto y coma
      quotes: ["error", "double"],        // exige comillas dobles
      indent: ["error", 2],               // exige indentación de 2 espacios
      "no-unused-vars": ["warn"],         // avisa si hay variables sin usar
      "no-console": ["off"]               // permite usar console.log (útil en TP)
    }
  }
];
