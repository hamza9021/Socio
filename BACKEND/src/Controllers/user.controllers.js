import { wrapperFunction } from "../Utils/wrapperFunction.utils.js";
import { User } from "../Models/user.models.js";
import { ApiResponse } from "../Utils/Response.utils.js";
import { ApiError } from "../Utils/error.utils.js";

const registerUser = wrapperFunction(async (req, res) => {
    try {
        const { username, email, password, full_name } = req.body;

        if (!username || !email || !password || !full_name) {
            throw new ApiError(401, "Please fill all the fields");
        }

        if (password.length < 6) {
            throw new ApiError(
                401,
                "Password must be at least 6 characters long"
            );
        }

        if (await User.findOne({ $or: [{ username }, { email }] })) {
            throw new ApiError(409, "User already exists");
        }

        const user = await User.create({
            username,
            email,
            password,
            full_name,
        });

        return res
            .status(201)
            .json(new ApiResponse(201, "User created successfully", user));
    } catch (error) {
        console.log(error);
    }
});

export { registerUser };
