import express from "express"
import { singleUpload } from "../middleware/common-middleware/imageUpload.js";
import { postGlasses, deleteGlass, updateGlass, getAllGlasses } from "../controllers/glassController.js";
import { isAdmin, requireSignIn } from "../middleware/authMiddleware.js";
const router = express.Router();



// create banner
router.post("/post-glass", singleUpload, postGlasses)
// delte
router.delete("/delete-glass/:id", deleteGlass);
// Update a glass
router.patch("/update-glass/:id", updateGlass);
// Get all glasses
router.get("/get-all-glasses", getAllGlasses);


export default router;