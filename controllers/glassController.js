import glassModel from "../models/glassModel.js";

export const postGlasses = async (req, res) => {
    try {
        const { glassesName, mediaType ,slug} = req.body;
        if (!req.file) {
            throw new Error("No file uploaded");
        }
        const mediaKey = req.file.filename; 
        const newGlasses = await glassModel.create({
            slug,
            glassesName,
            mediaKey,
            mediaType,
        });
        res.status(201).json({ success: true, message: "Glasses created successfully", glasses: newGlasses });
    } catch (error) {
        console.error(error);
        res.status(400).json({ success: false, message: error.message });
    }
};

// for delete
export const deleteGlass = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedGlass = await glassModel.findByIdAndDelete(id);
        if (!deletedGlass) {
            throw new Error("Glass not found");
        }
        res.status(200).json({ success: true, message: "Glass deleted successfully", glass: deletedGlass });
    } catch (error) {
        console.error(error);
        res.status(400).json({ success: false, message: error.message });
    }
};

// pathc
export const updateGlass = async (req, res) => {
    try {
        const { id } = req.params;
        const { glassesName, type, colour, mediaType } = req.body;
        const updatedGlass = await glassModel.findByIdAndUpdate(
            id,
            { glassesName, type, colour, mediaType },
            { new: true, runValidators: true }
        );
        if (!updatedGlass) {
            throw new Error("Glass not found");
        }
        res.status(200).json({ success: true, message: "Glass updated successfully", glass: updatedGlass });
    } catch (error) {
        console.error(error);
        res.status(400).json({ success: false, message: error.message });
    }
};

// get all glass
export const getAllGlasses = async (req, res) => {
    try {
        const glasses = await glassModel.find();
        res.status(200).json({ success: true, message: "All glasses fetched successfully", glasses });
    } catch (error) {
        console.error(error);
        res.status(400).json({ success: false, message: error.message });
    }
};
