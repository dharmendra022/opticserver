import express from "express";
import multer from "multer";
import shortid from "shortid";
import path from "path";
import { fileURLToPath } from "url";
import { createSaleProduct, getProductsByCategory} from "../controllers/newOnSale.js";

const __filename = fileURLToPath(import.meta.url);
// console.log("__filename",__filename);
const __dirname = path.dirname(__filename);

const router = express.Router();
 console.log("dirname", __dirname);
 const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(path.dirname(__dirname), "/client/public/uploads/"));
    },
    filename: function (req, file, cb) {
      cb(null, shortid.generate() + "-" + file.originalname);
    },
  });


const upload = multer({ storage });
router.post("/new-sale-products", upload.single("image"), createSaleProduct);

router.get("/products/:category", getProductsByCategory);
export default router;
