import mongoose from "mongoose";

const review = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    message: {
      type: String,
    },
    star: {
        type: Number,
        required: true,
        min: 1,
        max: 5
      }
  }
);

export default mongoose.model("customerReview", review);