import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        userName: {
            required: true,
            type: String,
        },
        email: {
            required: true,
            type: String,
        },
        password: {
            required: true,
            type: String,
        },
    },
    { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
