import express from "express";
import { isAdmin, requireSignIn } from "../middleware/authMiddleware.js";
import formidable from "express-formidable";
import {
  postBanner,
  deleteBannerController,
  getBannerController,
  getSingleBannerController,
  productPhotoController,
  updateBannerController,
  getBanner,
  updateBanner,
  deleteBanner,
  getAllBanners
} from "../controllers/bannerController.js";
const router = express.Router();
import  {upload}  from "../middleware/common-middleware/imageUpload.js";


// create banner
router.post("/create-banner",requireSignIn,isAdmin, upload, postBanner)

// GET endpoint for retrieving a specific banner
router.get('/banners/:id', getBanner);

// PATCH endpoint for updating a specific banner
router.patch('/banners/:id', updateBanner);

// DELETE endpoint for deleting a specific banner
router.delete('/banners/:id', deleteBanner);

// GET endpoint for retrieving all banners
router.get('/banners', getAllBanners);




//get photo

router.get("/product-photo/:pid", productPhotoController);

router.get("/get-banner", getBannerController);

//single product
router.get("/get-banner/:slug", getSingleBannerController);

router.put("/update-banner/:pid", requireSignIn, isAdmin, formidable(), updateBannerController)
//delete rproduct
router.delete("/delete-banner/:pid", deleteBannerController);

export default router;
