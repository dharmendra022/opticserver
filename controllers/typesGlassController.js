import typesGlassModal from "../models/typesGlassModal.js";

export const typePostGlasses = async (req, res) => {
    try {
        const { glassesName, mediaType ,slug, color, glassId,price} = req.body;
        if (!req.file) {
            throw new Error("No file uploaded");
        }
        const mediaKey = req.file.filename; 
        const newGlasses = await typesGlassModal.create({
            slug,
            glassesName,
            mediaKey,
            mediaType,
            color,
            glassId,
            price,
            
        });
        res.status(201).json({ success: true, message: "Glasses created successfully", glasses: newGlasses });
    } catch (error) {
        console.error(error);
        res.status(400).json({ success: false, message: error.message });
    }
};


// pathc
export const updateTypeGlass = async (req, res) => {
    try {
        const { id } = req.params;
        const { glassesName, type, colour, mediaType ,glassId,price} = req.body;
        const updatedGlass = await typesGlassModal.findByIdAndUpdate(
            id,
            { glassesName, type, colour, mediaType , glassId, price},
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



// for delete
export const typeDeleteGlass = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedGlass = await typesGlassModal.findByIdAndDelete(id);
        if (!deletedGlass) {
            throw new Error("Glass not found");
        }
        res.status(200).json({ success: true, message: "Glass deleted successfully", glass: deletedGlass });
    } catch (error) {
        console.error(error);
        res.status(400).json({ success: false, message: error.message });
    }
};



// get all glass
export const getAllGlassesTypes = async (req, res) => {
    try {
        const glasses = await typesGlassModal.find();
        res.status(200).json({ success: true, message: "All glasses fetched successfully", glasses });
    } catch (error) {
        console.error(error);
        res.status(400).json({ success: false, message: error.message });
    }
};