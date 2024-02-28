import express from "express";
const productrouter = express.Router();
import Product from "../models/product.js";
import cloudinary from "../utils/cloudinary.js";
import upload from "../multer/multer.js";

productrouter.post("/", upload.single("testimage"), async (req, res) => {
    try {
        const { name, category, description } = req.body;
        const { originalname } = req.file;
        const result = await cloudinary.uploader.upload(req.file.path);

        const newProduct = new Product({
            url: result.url,
            originalname,
            name: name,
            desc: description,
            category: category,
        });
        await newProduct.save();

        res.status(200).json({ success: true, message: "uploaded", data: result });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "error" });
    }
});

productrouter.get("/allplants", async (req, res) => {
    try {
        const allplants = await Product.find({});
        res.status(200).json(allplants);
    } catch (error) {
        console.log(error);
    }
});

productrouter.delete("/:id", async (req, res) => {
    try {
        console.log(req.params);
        const item = await Product.findById(req.params.id);
        await item.deleteOne();
        res.status(200).json({ message: "The item has been deleted" });
    } catch (error) {
        res.status(500).json(error);
    }
});

export default productrouter;
