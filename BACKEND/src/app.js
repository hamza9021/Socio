import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
dotenv.config({ path: "./.env" });



// -------------------IMPORT ROUTES-------------------
import { userRouter } from "./Routes/user.routes.js";

const app = express();
const corsOptions = {
    origin: [process.env.CORS_ORIGIN, process.env.CORS_LOCAL],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(express.urlencoded({ extended: true }));
app.use(express.static("./public"));
app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());


app.use("/api/v1/users", userRouter);




app.get("/health", (req, res) => {
    res.send("App Is Healthy! Up N Running!");
});

export { app };
