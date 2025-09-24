import { db } from "../../db/index.js";
import { users } from "../../db/schema.js";

// Obtener todos los usuarios
export const findAllUsers = async () => {
  return await db
    .select({
      id: users.id,
      username: users.username,
      email: users.email,
    })
    .from(users);
};

// Insertar un usuario nuevo
export const addUser = async (username, email) => {
  try {
    const result = await db
      .insert(users)
      .values({ username, email })
      .returning();

    return result[0];
  } catch (err) {
    console.error("DB Error:", err);
    throw err;
  }
};
