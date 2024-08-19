import express from "express";
import {
  createProduct,
  getAllProducts,
  getProductById,
} from "../controllers/productController";

const router = express.Router();

router.get("/", getAllProducts);
router.post("/", createProduct);
router.get("/:id", getProductById);

export default router;
