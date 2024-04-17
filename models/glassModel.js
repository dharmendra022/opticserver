import mongoose from "mongoose";

const glassesSchema = new mongoose.Schema({
  glassesName:{
    type:String
  },
  mediaKey: {
    type: String,
  },
  mediaType: {
    type: String,
    enum: ["document", "image", "video"],
  },
  slug:{
    type:String,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("glasses", glassesSchema);