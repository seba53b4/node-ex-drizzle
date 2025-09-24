import { findAllUsers } from "../services/user.service.js";

// GET /users
export const getUsers = async (req, res) => {
  try {
    const users = await findAllUsers();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
