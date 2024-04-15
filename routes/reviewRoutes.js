import express from "express";
import { postReview,getReview,deleteReview,updateReview } from "../controllers/reviewController.js";
const router = express.Router();


router.post("/post-review", postReview);
router.get("/get-review", getReview);
router.delete("/reviews/:id", deleteReview);
router.patch("/reviews/:id", updateReview);
// testing

export default router;