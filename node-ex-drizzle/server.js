import express from "express";
import bodyParser from "body-parser";
import userRoutes from "./src/routes/user.routes.js";
import authRoutes from "./src/routes/auth.routes.js";
import cookieParser from "cookie-parser";
import config from "./src/config/config.js";

const app = express();
app.use(bodyParser.json());
app.use(cookieParser());

app.use(express.static("public"));

// Rutas
app.use("/users", userRoutes);
app.use("/auth", authRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${config.PORT}`);
});
