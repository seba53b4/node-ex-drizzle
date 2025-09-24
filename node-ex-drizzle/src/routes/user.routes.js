import { Router } from "express";
import { getUsers } from "../controllers/user.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";

const router = Router();

router.get("/", authenticate, getUsers);

export default router;
