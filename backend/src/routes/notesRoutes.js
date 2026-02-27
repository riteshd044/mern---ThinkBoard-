import express from "express";
import {
  createNote,
  deleteNote,
  getNoteById,
  getNotes,
  patchNote,
  putNote,
} from "../controllers/notesControllers.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", protectRoute, getNotes);
router.get("/:id", protectRoute, getNoteById);
router.post("/", protectRoute, createNote);
router.put("/:id", protectRoute, putNote); // Entire note replaced
router.patch("/:id", protectRoute, patchNote); // Only provided fields updated
router.delete("/:id", protectRoute,  deleteNote);

export default router;
