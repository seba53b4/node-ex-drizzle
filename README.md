# 🛠️ Node + Express + Drizzle ORM + JWT + Docker Compose

## 📌 Descripción

Este proyecto es un **POC (Proof of Concept)** de backend en **Node.js + Express** con:

- **Persistencia** en PostgreSQL usando **Drizzle ORM**.
- **Autenticación** basada en **JWT manual** con:
  - Access tokens (vida corta, enviados en `Authorization: Bearer ...`).
  - Refresh tokens (vida larga, guardados en **cookies HttpOnly**).
- **Arquitectura organizada** en capas:
  - `src/config` → configuración centralizada (variables de entorno).
  - `src/db` → definición de tablas con Drizzle y conexión.
  - `src/services` → lógica de negocio (usuarios, auth).
  - `src/controllers` → endpoints Express.
  - `src/routes` → agrupación de rutas.
  - `server.js` → arranque de la app y middlewares.
- **Entorno de desarrollo local** con **Docker Compose**, que levanta:
  - PostgreSQL para la app (`postgres-app`).
  - PostgreSQL + Keycloak (`postgres-keycloak` + `keycloak`) como alternativa de autenticación centralizada.

El frontend de prueba se implementó como un **HTML simple con Vue 3 (CDN)** que permite:

- Login con email/password.
- Refrescar el token de sesión.
- Llamar a endpoints protegidos con el access token.
- Logout que borra cookie + access token en el cliente.

---

## 📂 Estructura del proyecto

```bash
node-ex-drizzle/
├── docker-compose.yml
├── drizzle.config.json
├── .vscode/settings.json   # Variables de entorno en desarrollo
├── .env.example            # (opcional) plantilla de variables
├── src/
│   ├── config/
│   │   └── index.js        # Centraliza variables de entorno
│   ├── db/
│   │   ├── index.js        # Conexión Drizzle + migraciones
│   │   └── schema.js       # Definición de tablas (users)
│   ├── services/
│   │   ├── user.service.js # CRUD de usuarios
│   │   └── auth.service.js # Registro, login, refresh
│   ├── controllers/
│   │   ├── user.controller.js
│   │   └── auth.controller.js
│   ├── routes/
│   │   ├── user.routes.js
│   │   └── auth.routes.js
│   └── server.js           # Configura Express, CORS y monta rutas
└── package.json
```

---

## 🐳 Docker Compose

`docker-compose.yml` levanta:

- **Keycloak** (`localhost:8080`) + Postgres dedicado (`localhost:25433`).
- **Postgres para la app** (`localhost:25432`).

Ejecutar:

```bash
docker-compose up -d
```

Ver contenedores:

```bash
docker ps
```

---

## 🗄️ Base de datos

Tabla inicial `users` definida en **Drizzle ORM**:

```js
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: varchar("username", { length: 50 }).notNull().unique(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
});
```

Migraciones con:

```bash
npx drizzle-kit generate
npx drizzle-kit push
```

---

## 🔐 Autenticación JWT

- **Login**

  - Verifica usuario con `bcrypt`.
  - Devuelve `accessToken` (JSON response).
  - Guarda `refreshToken` en cookie HttpOnly.

- **Refresh**

  - Lee `refreshToken` desde la cookie.
  - Si es válido, genera nuevo `accessToken` + refresh actualizado.

- **Logout**

  - Borra la cookie con `refreshToken`.

- **Endpoints protegidos**
  - Middleware valida `Authorization: Bearer <token>`.

---

## 🌐 Frontend de prueba

Archivo `index.html` (con Vue 3 por CDN):

- Formulario de login (`email` + `password`).
- Botón para llamar a `/users` (requiere access token).
- Botón para refrescar token.
- Botón para logout.

---

## ⚙️ Variables de entorno

Se centralizan en `.vscode/settings.json` o `.env`.

Ejemplo de `.env`:

```env
JWT_SECRET=my_jwt_secret
JWT_REFRESH_SECRET=my_refresh_secret
DB_HOST=localhost
DB_PORT=25432
DB_USER=appuser
DB_PASSWORD=appuser
DB_NAME=node_ex_drizzle
```

---

## 🚀 Scripts útiles

- Arrancar servidor en dev (con autoreload via **nodemon**):

```bash
npm run dev
```

- Generar y aplicar migraciones:

```bash
npx drizzle-kit generate
npx drizzle-kit push
```

---

## 🔮 Alternativas de autenticación

- **Keycloak**: IdP robusto (OpenID Connect / OAuth2).
- **JWT manual** (actual): control total en el backend.
- **Otros**:
  - Clerk / Auth0 (SaaS).
  - Passport.js (middleware auth).
  - NextAuth (si se usa Next.js).

---

## 📌 Estado actual del POC

- ✅ Registro y login de usuarios.
- ✅ JWT con refresh tokens vía cookies HttpOnly.
- ✅ Endpoint protegido `/users`.
- ✅ Docker Compose para levantar Postgres y Keycloak.
- ✅ Frontend de prueba (Vue + Fetch API).

Próximos pasos posibles:

- Agregar roles/permissions.
- Testing (Jest/Supertest).
- Integrar Keycloak real como alternativa al JWT manual.
- Mejorar seguridad (HTTPS + `secure: true` en cookies).
