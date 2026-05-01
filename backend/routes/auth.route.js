import express from "express";
import { login, createAdmin } from "../controllers/auth.controller.js"

const router = express.Router();

router.post("/login", login);
router.post("/create-admin", protect, adminOnly, createAdmin);

export default router;
