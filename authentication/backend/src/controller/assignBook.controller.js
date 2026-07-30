import AssignUser from "../model/assignUser.model.js";
import Book from "../model/book.model.js";

const assignToUser = async (req, res) => {
    try {
        const { userId, bookId } = req.body;
        if (!userId || !bookId) {
            return res.status(400).json({ message: "User ID and Book ID are required" });
        }

        const resultBook = await Book.findById(bookId);
        if (!resultBook) {
            return res.status(404).json({ message: "Book not found" });
        }

        if (resultBook.assign) {
            return res.status(400).json({ message: "Book has already been assigned" });
        }

        const resultUser = await AssignUser.findById(userId);
        if (!resultUser) {
            return res.status(404).json({ message: "No user found" });
        }

        const book = await Book.findByIdAndUpdate(
            bookId,
            {
                assign: true,
                user: resultUser._id,
                borrowed: new Date().toISOString(),
            },
            { new: true }
        );

        return res.status(200).json({ message: "Book assigned to user successfully", book });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getAllAssignedBooks = async (req, res) => {
    try {
        const allAssignedBooks = await Book.find({ assign: true });

        return res.status(200).json({ message: "All assigned books fetched successfully", data: allAssignedBooks });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const removeAssignedUser = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ message: "Book ID is required" });
        }

        const book = await Book.findByIdAndUpdate(
            id,
            { assign: false, $unset: { user: "" } },
            { new: true }
        );
        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }
        res.status(200).json({ message: "Assigned user removed successfully", book });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export { assignToUser, getAllAssignedBooks, removeAssignedUser };
