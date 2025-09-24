import { register, login } from "../services/auth.service.js";
import config from "../config/config.js";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = await register(username, email, password);
    res.json({ user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { user, accessToken, refreshToken } = await login(email, password);

    // refresh token seguro en cookie HttpOnly
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false, // ⚠️ ponelo true en HTTPS
      sameSite: "strict",
      path: "/",
    });

    res.json({ accessToken });
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};

export const refreshToken = async (req, res) => {
  console.log("Cookies recibidas:", JSON.stringify(req.cookies));
  const token = req.cookies.refreshToken;
  if (!token) {
    return res.status(401).json({ error: "No refresh token" });
  }

  try {
    const payload = jwt.verify(token, config.JWT.REFRESH_SECRET);
    const newAccessToken = jwt.sign(
      { id: payload.id, email: payload.email },
      process.env.JWT_SECRET,
      { expiresIn: "15m" }
    );

    res.json({ accessToken: newAccessToken });
  } catch (err) {
    return res.status(403).json({ error: "Invalid refresh token" });
  }
};

export const logoutUser = async (req, res) => {
  try {
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: false, // ⚠️ true en prod con HTTPS
      sameSite: "strict",
      path: "/",
    });
    res.json({ message: "Logged out successfully" });
  } catch (err) {
    res.status(500).json({ error: "Logout failed" });
  }
};
