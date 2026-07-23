import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        author: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: false,  // fix: was required but addBook never sends it
        },
        price: {
            type: Number,
            required: true,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        assign: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true,
    }
);

const Book = mongoose.model("Book", bookSchema);

export default Book;
