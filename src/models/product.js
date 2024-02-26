import mongoose from "mongoose";

const productschema = new mongoose.Schema(
    {
        originalname: {
            type: String,
            // required: true,
        },
        image: {
            data: Buffer,
            contentType: String,
        },
        userId: {
            type: String,
            // required: true,
        },
        desc: {
            type: String,
            max: 500,
        },
        url: {
            type: String,
        },
    },
    { timestamps: true }
);

const Product = mongoose.model("Product", productschema);

export default Product;
