import mongoose from "mongoose";

const productschema = new mongoose.Schema(
    {
        name: {
            type: String,
        },
        originalname: {
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
        category: {
            type: String,
        },
    },
    { timestamps: true }
);

const Product = mongoose.model("Product", productschema);

export default Product;
