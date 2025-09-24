root/
│── drizzle.config.json # Configuración de Drizzle CLI
│── package.json
│── server.js # Punto de entrada de la app (arranca Express)
│── .env # Variables de entorno (DB, Keycloak, etc.)
│
├── db/
│ ├── index.js # Conexión a Postgres con Drizzle
│ ├── schema.js # Definición de tablas (Drizzle ORM)
│ └── migrations/ # Migraciones generadas por drizzle-kit
│
├── src/
│ ├── routes/ # Rutas Express (organizadas por recurso)
│ │ ├── auth.routes.js # Endpoints de login/refresh/logout
│ │ └── user.routes.js # Endpoints CRUD de usuarios
│ │
│ ├── controllers/ # Lógica de cada endpoint
│ │ ├── auth.controller.js
│ │ └── user.controller.js
│ │
│ ├── services/ # Lógica de negocio / integración
│ │ ├── auth.service.js # Validación JWT con Keycloak
│ │ └── user.service.js # Operaciones con tabla users
│ │
│ ├── middlewares/ # Middlewares Express
│ │ └── auth.middleware.js # Verifica JWT en endpoints protegidos
│ │
│ ├── utils/ # Helpers (logger, error handler, etc.)
│ │ └── logger.js
│ │
│ └── config/ # Configuración centralizada
│ ├── db.config.js # Conexión Postgres
│ └── keycloak.config.js # URLs, realm, client_id, etc.
│
└── tests/ # Tests (pueden crecer con Jest, Supertest, etc.)
├── auth.test.js
└── user.test.js
