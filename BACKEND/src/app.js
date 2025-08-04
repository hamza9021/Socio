import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
dotenv.config({ path: "./.env" });

const app = express();
const corsOptions = {
    origin: process.env.CORS_ORIGIN,
};

app.use(express.urlencoded({ extended: true }));
app.use(express.static("./public"));
app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());

app.get("/", (req, res) => {
    res.send("Hello World!");
});

export { app };
