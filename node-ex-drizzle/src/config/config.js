import dotenv from "dotenv";
dotenv.config();

export default {
  PORT: process.env.PORT || 4000,

  DB: {
    HOST: process.env.DB_HOST || "localhost",
    USER: process.env.DB_USER || "postgres",
    PASSWORD: process.env.DB_PASSWORD || "postgres",
    NAME: process.env.DB_NAME || "mydb",
  },

  JWT: {
    SECRET: process.env.JWT_SECRET || "default-secret",
    REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || "default-refresh-secret",
    ACCESS_EXPIRES_IN: process.env.JWT_ACCESS_EXPIRES_IN || "15m",
    REFRESH_EXPIRES_IN: process.env.JWT_REFRESH_EXPIRES_IN || "7d",
  },
};
