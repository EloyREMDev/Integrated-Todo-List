# Lista de Tareas (Todo List) - Proyecto Integrado

Este proyecto es una **aplicación de lista de tareas** (Todo List) donde el **frontend y el backend están integrados y servidos desde el mismo servidor Node.js + Express**.

## 🚀 Descripción

- **Backend:** Node.js + Express, persistencia de tareas en un archivo JSON.
- **Frontend:** HTML, CSS y JavaScript puro.
- **Todo está servido desde el mismo servidor**: al iniciar el backend, también se sirve el frontend automáticamente desde la carpeta correspondiente.

---

## 📁 Estructura del Proyecto

```
Backend/
  src/
    db/
      db.js
      db.json
    index.js
  package.json
  package-lock.json
Frontend/
  index.html
  index.css
  index.js
  [otros archivos estáticos]
```

- El backend sirve los archivos estáticos de la carpeta `/Frontend`.
- El frontend interactúa con el backend usando fetch/AJAX desde el **mismo origen** (no se necesita CORS).

---

## ⚙️ ¿Cómo ejecutar el proyecto localmente?

1. **Instala las dependencias del backend:**
   ```bash
   cd Backend
   npm install
   ```

2. **Ejecuta el servidor:**
   ```bash
   npm run dev
   ```
   o
   ```bash
   node src/index.js
   ```

3. **Abre tu navegador y entra a:**
   ```
   http://localhost:3000
   ```

   Verás la aplicación de la lista de tareas funcionando.

---

## 📝 Notas importantes

- El frontend **NO debe abrirse directamente** como archivo HTML, sino accediendo a través del servidor Express (`http://localhost:3000`).
- No es necesario configurar CORS, ya que todo está en el mismo origen.
- El archivo de base de datos `db.json` es un archivo plano en el servidor, usado solo como ejemplo de persistencia.

---

## 📦 Tecnologías utilizadas

- Node.js
- Express
- HTML, CSS, JavaScript

---

## 🎯 Objetivo educativo

Este proyecto muestra cómo integrar frontend y backend en un solo servidor, facilitando el despliegue y evitando problemas de CORS para proyectos pequeños y medianos.

---

**Desarrollado por [EloyREMDev](https://github.com/EloyREMDev)**
