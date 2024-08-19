import express from "express";
import {
  createUser,
  getAllUsers,
  getUserById,
} from "../controllers/userController";
import { checkRole } from "../middlewares";
const router = express.Router();

router.get("/", getAllUsers);
router.post("/", createUser);
router.get("/:id", getUserById);

export default router;
