import { Router } from "express";
import {
    registerUser,
    loginUser,
    logoutUser,
    getUserProfile,
    updateUserPassword
} from "../Controllers/user.controllers.js";

import { verifyJwt } from "../Middlewares/auth.middleware.js";

const userRouter = Router();

userRouter.route("/register").post(registerUser);
userRouter.route("/login").post(loginUser);
userRouter.route("/logout").post(verifyJwt, logoutUser);
userRouter.route("/profile").get(verifyJwt, getUserProfile);
userRouter.route("/update-password").patch(verifyJwt, updateUserPassword);

export { userRouter };
