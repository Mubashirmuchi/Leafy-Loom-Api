import express from "express";
const productrouter = express.Router();
import Product from "../models/product.js";
// import User from "../models/user.js";
import cloudinary from "../utils/cloudinary.js";
import upload from "../multer/multer.js";

productrouter.post("/", upload.single("testimage"), (req, res) => {
    const { originalname, path } = req.file;
    // const userId = req.body.username;
    console.log("original path and name", originalname, path);
    try {
        cloudinary.uploader.upload(req.file.path, (err, result) => {
            if (err) {
                console.log(err);

                return res.status(500).json({ success: false, message: "error" });
            }
            const url = result.url;
            const newPost = new Post({ url, originalname, path });

            newPost.save().then(() => {});
            res.status(200).json({ success: true, message: "uploaded", data: result });
        });
    } catch (error) {
        res.status(500).json(error);
    }
});
export default productrouter;
