import express from "express"
import { singleUpload } from "../middleware/common-middleware/imageUpload.js";
import { isAdmin, requireSignIn } from "../middleware/authMiddleware.js";
const router = express.Router();
import { typePostGlasses ,updateTypeGlass,typeDeleteGlass,getAllGlassesTypes} from "../controllers/typesGlassController.js";



// create banner
router.post("/post-type-glass", singleUpload, typePostGlasses)

// delete
router.delete("/delete-type-glass/:id", typeDeleteGlass);

// Update a glass
router.patch("/update-type-glass/:id", updateTypeGlass);

// Get all glasses
router.get("/get-all-type-glasses", getAllGlassesTypes);


export default router;