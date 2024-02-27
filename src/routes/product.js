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
        res.status(200).json({ success: true, data: allplants });
    } catch (error) {
        console.log(error);
    }
});

export default productrouter;
