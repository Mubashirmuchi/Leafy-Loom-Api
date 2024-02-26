import express from "express";
const app = express();
import mongoose from "mongoose";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.js";
import productrouter from "./routes/product.js";
dotenv.config();

app.use(cookieParser());
app.use(express.json());
app.use(morgan("common"));
app.use(cors());
app.use("/api/auth", authRouter);
app.use("/api/post", productrouter);

const PORT = process.env.PORT || 5000;
mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
        app.listen(PORT, () => {
            console.log(`server connected on ${PORT}`);
        });
    })

    .catch((error) => {
        console.log(error);
    });
