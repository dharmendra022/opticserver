import bannerModel from "../models/bannerModel.js";
import fs from "fs";
import slugify from "slugify";


export const postBanner = async (req, res) => {
  try {
    console.log(req.files);
    const { mediaType, slug } = req.body;
    if (!mediaType) {
      throw new Error("MediaType is required");
    }
    if (!req.files) {
      throw new Error("No files uploaded");
    }
    const mediaKeys = Object.values(req.files).map(file => {
      if (Array.isArray(file)) {
        return file.map(f => f.filename);
      } else {
        return file.filename;
      }
    }).flat();
    const banner = await bannerModel.create({
      mediaKeys: mediaKeys.map(filename => ({ filename })),
      mediaType,
      slug
    });
    res.status(201).json({ success: true, message: "Banner created successfully", banner });
  } catch (error) {
    console.error(error);
    res.status(400).json({ success: false, message: error.message });
  }
};


// get banner
export const getBanner = async (req, res) => {
  try {
    const banner = await bannerModel.findById(req.params.id);
    if (!banner) {
      throw new Error("Banner not found");
    }
    res.status(200).json({ success: true, banner });
  } catch (error) {
    console.error(error);
    res.status(404).json({ success: false, message: error.message });
  }
};

// update banner
export const updateBanner = async (req, res) => {
  try {
    const { mediaType, slug } = req.body;
    const bannerId = req.params.id;

    const banner = await bannerModel.findById(bannerId);
    if (!banner) {
      return res.status(404).json({ success: false, message: "Banner not found" });
    }
    if (mediaType) {
      banner.mediaType = mediaType;
    }
    if (slug) {
      banner.slug = slug;
    }
    await banner.save();
    res.status(200).json({ success: true, message: "Banner updated successfully", banner });
  } catch (error) {
    console.error(error);
    res.status(400).json({ success: false, message: error.message });
  }
};

// My code end



// Delete Banner
// Delete Banner API
export const deleteBanner = async (req, res) => {
  try {
    const bannerId = req.params.id;

    const banner = await bannerModel.findById(bannerId);
    if (!banner) {
      return res.status(404).json({ success: false, message: "Banner not found" });
    }

    await bannerModel.deleteOne({ _id: bannerId }); // Use deleteOne() to remove the banner

    res.status(200).json({ success: true, message: "Banner deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(400).json({ success: false, message: error.message });
  }
};


// get all banner
export const getAllBanners = async (req, res) => {
  try {
    const banners = await bannerModel.find();
    res.status(200).json({ success: true, banners });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};







//get all Banner
export const getBannerController = async (req, res) => {
  try {
    const products = await bannerModel
      .find({})
      .select("-photo")
      .limit(12)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      counTotal: products.length,
      message: "All Banner List ",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Erorr in getting products",
      error: error.message,
    });
  }
};
// get photo
export const productPhotoController = async (req, res) => {
  try {
    console.log("hello");
    const product = await bannerModel.findById(req.params.pid).select("photo");

    if (product.photo.data) {
      res.set("Content-type", product.photo.contentType);
      return res.status(200).send(product.photo.data);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Erorr while getting photo",
      error,
    });
  }
};

// get single Banner
export const getSingleBannerController = async (req, res) => {
  try {
    const product = await bannerModel
      .findOne({ slug: req.params.slug })
      .select("-photo")
    res.status(200).send({
      success: true,
      message: "Single Product Fetched",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Eror while getitng single product",
      error,
    });
  }
};

export const updateBannerController = async (req, res) => {
  try {
    const { name } = req.fields;
    const { photo } = req.files;
    //validation
    switch (true) {
      case !name:
        return res.status(500).send({ error: "Name is Required" });

      case photo && photo.size > 1000000:
        return res
          .status(500)
          .send({ error: "photo is Required and should be less then 1mb" });
    }

    const products = await bannerModel.findByIdAndUpdate(
      req.params.pid,
      { ...req.fields, slug: slugify(name) },
      { new: true }
    );
    if (photo) {
      products.photo.data = fs.readFileSync(photo.path);
      products.photo.contentType = photo.type;
    }
    await products.save();
    res.status(201).send({
      success: true,
      message: "Banner Updated Successfully",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in crearing product",
    });
  }
};

//delete controller
export const deleteBannerController = async (req, res) => {
  try {
    await bannerModel.findByIdAndDelete(req.params.pid).select("-photo");
    res.status(200).send({
      success: true,
      message: "Product Deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while deleting product",
      error,
    });
  }
};