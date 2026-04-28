# 🔐 Demo Seguridad JWT — Node.js + Express + Sequelize

## 🚀 Cómo encender el proyecto

```bash
npm install
npm run dev
```

> Asegúrate de tener MySQL corriendo y tu archivo `.env` configurado:

```env
NODE_ENV=development
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=tu_password
DB_NAME=jwt_db
JWT_SECRET=clave_super_segura
JWT_REFRESH_SECRET=clave_refresh_super_segura
```

---

## 📁 Estructura del proyecto

```
app/
├── config/
│   └── db.config.js
├── controllers/
│   └── auth.controller.js
├── middleware/
│   ├── authJwt.js
│   ├── errorHandler.js        ← nuevo
│   └── verifySignUp.js
├── models/
│   ├── index.js
│   ├── user.model.js
│   ├── role.model.js
│   └── refresh_token.model.js ← nuevo
├── routes/
│   ├── auth.routes.js
│   └── user.routes.js
└── server.js
```

---

## ✅ Propuesta de mejora — qué agregué

### 1. Refresh Token
El login ahora devuelve dos tokens: un `accessToken` que dura 15 minutos y un `refreshToken` que dura 7 días. Cuando el accessToken expira, se puede renovar llamando a `/api/auth/refresh` sin volver a iniciar sesión. El refreshToken se guarda en la base de datos para poder controlarlo.

**Endpoints nuevos:**
- `POST /api/auth/refresh` → renueva el accessToken

### 2. Logout real
Como JWT no permite cancelar tokens por sí solo, lo que hice fue eliminar el refreshToken de la base de datos al hacer logout. Así, aunque el accessToken todavía exista, ya no se puede renovar y la sesión queda efectivamente cerrada.

**Endpoints nuevos:**
- `POST /api/auth/logout` → elimina el refreshToken de la BD

### 3. Middleware global de errores
Creé un middleware central que captura todos los errores de la aplicación y los devuelve siempre en el mismo formato JSON. En modo desarrollo también muestra el stack trace para facilitar el debug.

```js
{ "success": false, "message": "descripción del error" }
```

También agregué un manejador de rutas inexistentes para que devuelva JSON en lugar del HTML por defecto de Express.

### 4. Helmet
Agregué Helmet con una sola línea. Esto hace que cada respuesta incluya automáticamente headers de seguridad como `Content-Security-Policy`, `X-Frame-Options`, `Strict-Transport-Security` y otros, protegiendo la API contra ataques comunes como XSS y Clickjacking.
