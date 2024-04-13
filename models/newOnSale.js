import mongoose from "mongoose";
const productSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    price: {
        type: Number,
    },
    quantity: {
        type: Number,
    },
    description: {
        type: String,
    },
    offer: {
        type: Number,
    },
    image:{
        type:String
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


