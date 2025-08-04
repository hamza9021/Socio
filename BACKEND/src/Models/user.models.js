import mongoose, { Schema, model } from "mongoose";
import bcrypt from "bcrypt";

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

userSchema.pre("save", async function (next) {
    try {
        if (this.isModified("password")) {
            const hashedPassword = await bcrypt.hash(this.password, 10);
            this.password = hashedPassword;
        }
        next();
    } catch (error) {
        console.log(error);
        next(error);
    }
});

userSchema.methods.isPasswordMatch = async function (password) {
   return await bcrypt.compare(password, this.password);
}

const User = model("User", userSchema);

export { User };
