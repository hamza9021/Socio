import { wrapperFunction } from "../Utils/wrapperFunction.utils.js";
import { User } from "../Models/user.models.js";
import { ApiResponse } from "../Utils/Response.utils.js";
import { ApiError } from "../Utils/error.utils.js";
import { cookieOptions } from "../Utils/cookiesOptions.utils.js";
import { generateAccessAndRefreshToken } from "../Utils/generateAccessAndRefreshToken.js";

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
            .json(new ApiResponse(201, user, "User created successfully"));
    } catch (error) {
        console.log(error);
    }
});

const loginUser = wrapperFunction(async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            throw new ApiError(401, "Please fill all the fields");
        }

        const user = await User.findOne({ email });
        if (!user) {
            throw new ApiError(401, "Invalid email or password");
        }

        if (!user.isPasswordMatch(password)) {
            throw new ApiError(401, "Invalid email or password");
        }

        const { accessToken, refreshToken } =
            await generateAccessAndRefreshToken(user._id);

        const updateUser = await User.findById(user._id).select(
            "-password -refreshToken"
        );

        return res
            .cookie("accessToken", accessToken, cookieOptions)
            .cookie("refreshToken", refreshToken, cookieOptions)
            .status(200)
            .json(
                new ApiResponse(200, "User Logged In Successfully", updateUser)
            );
    } catch (error) {
        console.log(error);
    }
});

const logoutUser = wrapperFunction(async (req, res) => {
    await User.findByIdAndUpdate(
        req.user._id,
        { $set: { refreshToken: undefined } },
        { new: true }
    );

    res.status(200)
        .clearCookie("accessToken", cookieOptions)
        .clearCookie("refreshToken", cookieOptions)
        .json(new ApiResponse(200, "Logout Successfully", {}));
});

const getUserProfile = wrapperFunction(async (req, res) => {
    const user = req.user;
    console.log("user", user);
    if (!user) {
        throw new ApiError(401, "Unauthorized Please Log in");
    }
    if (!User.findById(user._id)) {
        throw new ApiError(401, "Unauthorized");
    }
    const updatedUser = await User.findById(user._id).select(
        "-password -refreshToken"
    );
    return res
        .status(200)
        .json(new ApiResponse(200, "User Profile Found", updatedUser));
});

export { registerUser, loginUser, logoutUser, getUserProfile };
