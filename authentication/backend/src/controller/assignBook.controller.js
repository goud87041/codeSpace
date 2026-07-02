import {User} from "../model/user.model.js"

const assignToUser = async (req, res) => {
    try{
        const {userId , bookId} = req.body;
        if(!userId || !bookId){
            return res.status(400).json({ message: "User ID and Book ID are required" });
        }
        const user = await User.findeById(userId);
        if(!user){
            return res.status(404).json({ message: "User not found" });
        }

        const book = await Book.findById(bookId);
        if(!book){
            return res.status(404).json({ message: "Book not found" });
        }
        const assignBook = await Book.create({
            user : userId,
            book : bookId
        });
        res.status(201).json({ message: "Book assigned to user successfully", assignBook });

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
        const allAssignedUsers = await Book.findAll({book : bookId}).populate('user');
        if(!allAssignedUsers){
            return res.status(404).json({ message: "No users assigned to this book" });
        }
        res.status(200).json({ message: "All assigned users fetched successfully", allAssignedUsers });
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

        const removeAssignedUser = await Book.findOneAndDelete({book : bookId , user : userId});
        if(!removeAssignedUser){
            return res.status(404).json({ message: "No assigned user found for this book" });
        }
        res.status(200).json({ message: "Assigned user removed successfully", removeAssignedUser });

    }catch(error){
        res.status(500).json({ message: error.message });
    }
}

export default {assignToUser , getAssignedUsers , removeAssignedUser}
