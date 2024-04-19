
import newOnSale from "../models/newOnSale.js";

export const createSaleProduct = async (req, res) => {
    try {
        const { name, price, slug, offer, category } = req.body;
        let existingProduct = await newOnSale.findOne({ category });
        const mediaKey = req?.file?.filename;
        if (!existingProduct) {
            existingProduct = new newOnSale({ category, products: [] });
        }
        const newProduct = {
            name,
            price,
            slug,
            offer,
            mediaKey
        };
        existingProduct.products.push(newProduct);
        await existingProduct.save();
        const responseData = {
            category,
            message: "Product created successfully",
            newOnSale: existingProduct
        };
        res.status(201).json(responseData);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


export const getProductsByCategory = async (req, res) => {
    try {
        const { category } = req.params;
        const existingProduct = await newOnSale.findOne({ category });
        if (!existingProduct) {
            return res.status(404).json({ message: "No products found for the provided category" });
        }
        res.status(200).json(existingProduct);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const deleteProduct = async (req, res) => {
    try {
        const { category, productId } = req.params;
        const existingProduct = await newOnSale.findOne({ category });
        if (!existingProduct) {
            return res.status(404).json({ message: "Category not found" });
        }
        const productIndex = existingProduct.products.findIndex(product => product._id === productId);
        if (productIndex === -1) {
            return res.status(404).json({ message: "Product not found" });
        }
        existingProduct.products.splice(productIndex, 1);
        await existingProduct.save();
        res.status(200).json({ message: "Product deleted successfully", newOnSale: existingProduct });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

