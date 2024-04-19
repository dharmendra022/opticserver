import express from "express";
import multer from "multer";
import shortid from "shortid";
import path from "path";
import { fileURLToPath } from "url";
import { createSaleProduct, getProductsByCategory,deleteProduct} from "../controllers/newOnSale.js";
import { singleUpload } from "../middleware/common-middleware/imageUpload.js";
const router = express.Router();


router.post("/new-sale-products", singleUpload, createSaleProduct);

router.get("/products/:category", getProductsByCategory);
router.delete("/delete-product/:category/:productId", deleteProduct);
export default router;
