import User from "../model/user.model.js";
import Book from "../model/book.model.js";

const assignToUser = async (req, res) => {
    try{
        const {userId , bookId} = req.body;
        if(!userId || !bookId){
            return res.status(400).json({ message: "User ID and Book ID are required" });
        }

        // fix: typo findeById -> findById
        const user = await User.findById(userId);
        if(!user){
            return res.status(404).json({ message: "User not found" });
        }

        const book = await Book.findById(bookId);
        if(!book){
            return res.status(404).json({ message: "Book not found" });
        }

        // fix: update the book's user field instead of creating a duplicate Book document
        book.user = userId;
        await book.save();

        res.status(200).json({ message: "Book assigned to user successfully", book });

    }catch(error){
        res.status(500).json({ message: error.message });
    }
}

const getAssignedUsers = async (req, res) => {
    try{
        const {bookId} = req.params;
        if(!bookId){
            return res.status(400).json({ message: "Book ID is required" });
        }

        // fix: Book.findAll does not exist in Mongoose, use Book.find
        const allAssignedBooks = await Book.find({ _id: bookId }).populate('user');
        if(!allAssignedBooks || allAssignedBooks.length === 0){
            return res.status(404).json({ message: "No users assigned to this book" });
        }
        res.status(200).json({ message: "All assigned users fetched successfully", allAssignedBooks });
    }catch(error){
        res.status(500).json({ message: error.message });
    }
}

const removeAssignedUser = async (req, res) => {
    try{
        const {bookId} = req.params;
        const {userId} = req.body;
        if(!bookId || !userId){
            return res.status(400).json({ message: "Book ID and User ID are required" });
        }

        // fix: unset the user field on the book instead of deleting the book document
        const book = await Book.findOneAndUpdate(
            { _id: bookId, user: userId },
            { $unset: { user: "" } },
            { new: true }
        );
        if(!book){
            return res.status(404).json({ message: "No assigned user found for this book" });
        }
        res.status(200).json({ message: "Assigned user removed successfully", book });

    }catch(error){
        res.status(500).json({ message: error.message });
    }
}

export default { assignToUser, getAssignedUsers, removeAssignedUser };
