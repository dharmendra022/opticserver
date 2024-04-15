import express from "express";
import { loginController, registerController ,getAllUsers} from "../controllers/authController.js";
import { isAdmin, requireSignIn } from "../middleware/authMiddleware.js";
const router = express.Router();
router.post("/register", registerController);
router.post("/login", loginController);
//get all user details
router.get("/get-all-user", getAllUsers)

//Protected UserRoute
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});

//Protected admin route
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

export default router;
