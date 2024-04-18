import mongoose from "mongoose";

const mediaSchema = new mongoose.Schema({
  filename: {
    type: String,
    required: true
  }
});
const bannerSchema = new mongoose.Schema({
  mediaKeys: {
    type: [mediaSchema], // Define mediaSchema as the type
    required: true
  },
  slug: {
    type: String,
    required: true
  },
  mediaType: {
    type: String,
    enum: ["document", "image", "video"],
    required: true
  }
});

export default mongoose.model("Banners", bannerSchema);
