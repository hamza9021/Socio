import { Router } from "express";
import { registerUser, loginUser } from "../Controllers/user.controllers.js";

const userRouter = Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);

export { userRouter };
