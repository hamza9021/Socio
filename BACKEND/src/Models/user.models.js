import { Model, Schema } from "mongoose";

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        full_name: {
            type: String,
            required: true,
        },
        bio: {
            type: String,
        },
        profile_pic_url: {
            type: String,
            default: "https://avatars.githubusercontent.com/u/155261523?v=4",
        },
        is_private: {
            type: Boolean,
            default: false,
        },
        is_verified: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

const User = Model("User", userSchema);

export { User };
