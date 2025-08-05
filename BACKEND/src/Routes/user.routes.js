import { Router } from "express";
import {
    registerUser,
    loginUser,
    logoutUser,
} from "../Controllers/user.controllers.js";

import { verifyJwt } from "../Middlewares/auth.middleware.js";

const userRouter = Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/logout", verifyJwt, logoutUser);

export { userRouter };
