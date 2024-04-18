import mongoose from "mongoose";

const typesGlass = new mongoose.Schema({
  glassesName:{
    type:String
  },
  color:{
    type:String
  },
  price:{
    type:Number
  },
  mediaKey: {
    type: String,
  },
  glassId:{
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
  }
});

export default mongoose.model("eyeglasses", typesGlass);