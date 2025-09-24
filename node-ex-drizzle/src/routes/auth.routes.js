import express from "express";
import {
  registerUser,
  loginUser,
  refreshToken,
  logoutUser,
} from "../controllers/auth.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/refresh", refreshToken);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/me", authenticate, (req, res) => {
  res.json({ user: req.user });
});

export default router;
