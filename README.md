# Trabajo práctico 06

## Proyecto de partida y cambios
El proyecto parte del **TP5**, donde toda la lógica estaba concentrada en `index.js`.  
En el **TP6** se modularizó la aplicación:  
- `configuracion.js` → lectura de variables de entorno.  
- `app.js` → pipeline global de Express.  
- `servicios/reservas.js` → lógica de datos en memoria.  
- `controladores/reservas.js` → respuestas HTTP y vistas.  
- `rutas/reservas.js` → caminos relativos.  
- `middleware/solicitudes.js` y `middleware/reservas.js` → identificación, duración y validación.  

---

## Instalación y ejecución

1. Clonar el repositorio:
  ```bash
  git clone <URL_DEL_REPO>
  cd tp6-reservas
  ```
2. Instalar dependencias:
  ```bash
  npm install
  ```
3. Configurar entorno (copiar el archivo de ejemplo):
  ```bash
  cp .env.example .env
  ```
4. Ejecutar servidor:
  ```bash
  npm start
  ```
  Resultado esperado:
  ```Código
  Servidor iniciado en http://localhost:3000
  ```

---

## Configuración del entorno
- **PORT** → puerto del servidor (ejemplo: 3000).  
- **NODE_ENV** → `development` o `production`.  
  - En `development` se usa log `dev`.  
  - En `production` se usa log `combined`.  

No se incluye `.env` real, solo `.env.example`.

---

## Mapa de módulos y dependencias
```text
index.js
 ├── configuracion.js        # Lee variables de entorno (PORT, NODE_ENV)
 ├── servicios/reservas.js   # Único arreglo de reservas y lógica de datos
 └── app.js
      ├── middleware/solicitudes.js   # ID y duración de cada request
      └── rutas/reservas.js
           ├── controladores/reservas.js   # Renderiza vistas y JSON
           └── middleware/reservas.js      # Validación de reservas y sección
```           

---

## Pipeline y contrato de rutas
Pipeline global:
Morgan → identificarSolicitud → medirDuracion → layouts → static → urlencoded → json → rutas → router /reservas → 404 final

- **Morgan**: registra todas las solicitudes HTTP.  
- **identificarSolicitud**: asigna un ID BIB consecutivo.  
- **medirDuracion**: mide tiempo hasta `finish`.  
- **layouts**: aplica el layout EJS.  
- **static**: sirve recursos públicos (CSS, imágenes).  
- **urlencoded/json**: parsean formularios y JSON.  
- **rutas**: manejan `/` y `/estado`.  
- **router /reservas**: gestiona listado, detalle, formulario y POST.  
- **404 final**: responde con vista `no-encontrado.ejs`.  

Contrato de rutas:
- `GET /` → inicio.  
- `GET /estado` → estado JSON.  
- `GET /reservas` → listado.  
- `GET /reservas/nueva` → formulario.  
- `GET /reservas/:id` → detalle.  
- `POST /reservas` → crear reserva (con validación).  

---

## Matriz antes/después

| Caso                       | Esperado         | Evidencia breve                          |
|----------------------------|------------------|------------------------------------------|
| GET `/`                    | 200              | Vista inicio con ID BIB visible           |
| GET `/estado`              | 200              | JSON con cantidad inicial                 |
| GET `/reservas`            | 200              | Listado con reservas iniciales            |
| GET `/reservas/nueva`      | 200              | Formulario con campos y select            |
| GET `/reservas/:id` válido | 200              | Vista detalle con datos                   |
| GET `/reservas/:id` inexistente | 404        | Vista `no-encontrado.ejs`                 |
| POST `/reservas` inválido  | 400              | Errores mostrados, sin alta               |
| POST `/reservas` válido    | 302 → 200        | Nueva reserva en listado y estado         |
| GET `/css/estilos.css`     | 200              | CSS cargado                               |
| GET `/url-inexistente`     | 404              | Vista `no-encontrado.ejs`                 |
| Reinicio                   | 200              | Regreso a la semilla inicial              |
| Puerto alternativo          | 200              | Responde en puerto configurado            |
| Puerto inválido             | No inicia        | Mensaje explícito                         |

---

## Formato y análisis estático
1. Configuración en eslint.config.js.

2. Reglas: punto y coma, comillas dobles, indentación 2 espacios, advertencia en variables sin usar.

3. Comando ejecutado:
- `npm run format` → aplica Prettier sobre `src`.  
- `npm run format:check` → verifica formato sin modificar.  
- `npm run lint` → ejecuta ESLint sobre `src`.  
- `npm run check` → combina `format:check` y `lint`.  
- `npm start` → inicia la aplicación en el puerto configurado.  

Ejemplo:  
- `PORT=4000 npm start` → inicia en puerto 4000.  
- `PORT=99999 npm start` → no inicia, muestra mensaje de error explícito.  

---

## Persistencia temporal y límites
- El **único arreglo de reservas** vive en `servicios/reservas.js`.  
- Se inicializa en `index.js` y se pasa al servicio.  
- Al reiniciar el servidor, el arreglo vuelve a su estado inicial (no hay base de datos).  

---

## Explicaciones clave
- **Por qué el servicio no usa `res`**: porque su responsabilidad es manejar datos, no responder HTTP.  
- **Qué hace el controlador**: recibe `req` y `res`, llama al servicio y decide si renderizar vistas o devolver JSON.  
- **Por qué el router declara caminos relativos**: para que se monten en `app.js` bajo `/reservas` y no repetir prefijos.  
- **Dónde vive el único arreglo de reservas**: en `servicios/reservas.js`, inicializado desde `index.js`.  
- **Qué ocurre al reiniciar**: las reservas creadas se pierden, porque solo están en memoria.  

---
