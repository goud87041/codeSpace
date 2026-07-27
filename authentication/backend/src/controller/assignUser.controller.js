import User from "../model/user.model.js";
import Book from "../model/book.model.js";
import AssignUser from "../model/assignUser.model.js";

const assignToUser = async (req, res) => {
    try {
        const { userId, bookId } = req.params;
        if (!userId || !bookId) {
            return res.status(400).json({ message: "User ID and Book ID are required" });
        }

        const resultBook = await Book.findOne({ _id: bookId })

        if (!resultBook.assign) {
            return res.status(201).json({ message: "Book has already assigned" });
        }

        const resultUser = await User.findById({
            _id: userId
        })

        if (!resultUser) {
            return res.status(404).json({ message: "No user found" });
        }

        const result = await Book.updateOne({
            _id: bookId
        }, {
            assign: true,
            user: resultUser._id,
            borrowed: new Date().toISOString()
        })

        if (!result) {
            return res.status(400).json({ message: "Something went wrong" });
        }

        return res.status(200).json({ message: "Book assigned to user successfully", resultBook });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getAllAssignedBooks = async (req, res) => {
    try {
        // fix: Book.findAll does not exist in Mongoose, use Book.find
        const allAssignedBooks = await Book.find({ assign: true });
        if (!allAssignedBooks) {
            return res.status(404).json({ message: "No users assigned to this book" });
        }

        return res.status(200).json({ message: "All assigned users fetched successfully", allAssignedBooks });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const removeAssignedUser = async (req, res) => {
    try {
        const { bookId } = req.params;
        const { userId } = req.body;
        if (!bookId || !userId) {
            return res.status(400).json({ message: "Book ID and User ID are required" });
        }
        const bookId = id;

        // fix: unset the user field on the book instead of deleting the book document
        const book = await Book.findOneAndUpdate(
            { _id: bookId, user: userId },
            { $unset: { user: "" } },
            { new: true }
        );
        if (!book) {
            return res.status(404).json({ message: "No assigned user found for this book" });
        }
        res.status(200).json({ message: "Assigned user removed successfully", book });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export { assignToUser, getAllAssignedBooks, removeAssignedUser };
