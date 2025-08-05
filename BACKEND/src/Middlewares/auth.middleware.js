import jwt from "jsonwebtoken";
import { User } from "../Models/user.models.js";
import { ApiError } from "../Utils/error.utils.js";

const verifyJwt = async (req, _, next) => {
    try {
        const accessToken = req.cookies.accessToken;

        if (!accessToken) {
            throw new ApiError(401, "Unauthorized Access");
        }

        const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);

        const user = await User.findById(decoded._id);

        if (!user) {
            throw new ApiError(401, "Unauthorized Access");
        }

        req.user = user;
        next();
    } catch (error) {
        console.log(error);
    }
};

export { verifyJwt };
