import { Router } from "express";
import { registerUser } from "../Controllers/user.controllers.js";

const userRouter = Router();

userRouter.post("/register", registerUser);

export { userRouter };
