import express from "express";
import { getFeatured, createFeatured, updateFeatured, deleteFeatured } from "../controllers/featured.controller.js";
import { protect, adminOnly } from "../middleware/auth.js";

const router = express.Router();

router.get("/", getFeatured);
router.post("/", protect, adminOnly, createFeatured);
router.put("/:id", protect, adminOnly, updateFeatured);
router.delete("/:id", protect, adminOnly, deleteFeatured);

export default router;