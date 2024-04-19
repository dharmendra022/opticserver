import mongoose from "mongoose";
const productSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    price: {
        type: Number,
    },
    offer: {
        type: Number,
    },
    mediaKey:{
        type:String
    },
    slug:{
        type:String,
    }
});

const newOnSale = new mongoose.Schema({
    category: {
        type: String,
        required: true,
    },
    products: [productSchema],
});

export default mongoose.model("SaleOffer", newOnSale);


