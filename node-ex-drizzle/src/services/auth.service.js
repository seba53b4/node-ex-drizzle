import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { db } from "../../db/index.js";
import { users } from "../../db/schema.js";
import { eq } from "drizzle-orm";
import config from "../config/config.js";

const JWT_SECRET = config.JWT.SECRET;
const JWT_REFRESH_SECRET = config.JWT.REFRESH_SECRET;

export const register = async (username, email, password) => {
  const passwordHash = await bcrypt.hash(password, 10);

  const [user] = await db
    .insert(users)
    .values({
      username,
      email,
      passwordHash,
    })
    .returning();

  return user;
};

export const login = async (email, password) => {
  const [user] = await db.select().from(users).where(eq(users.email, email));

  if (!user) throw new Error("Usuario no encontrado");

  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) throw new Error("Contraseña incorrecta");

  // tokens
  const accessToken = jwt.sign(
    { sub: user.id, email: user.email },
    JWT_SECRET,
    { expiresIn: "15m" }
  );

  const refreshToken = jwt.sign({ sub: user.id }, JWT_REFRESH_SECRET, {
    expiresIn: "7d",
  });

  return { user, accessToken, refreshToken };
};
