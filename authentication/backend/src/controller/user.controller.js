import User from "../model/user.model.js";


const addUser = async (req, res) => {
    const { userName, email, role } = req.body;

    if (!userName || !email || !role) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const response = await User.create({ userName, email, role });

    if (response) {
        return res.status(201).json({ message: "user added successfully" });
    }
    else {
        return res.status(500).json({ message: "user not added" });
    }

}

const removeUser = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ message: "user id is required" });
    }

    const response = await User.deleteOne({ _id: id });

    if (response) {
        return res.status(200).json({ message: "user removed successfully" });
    }
    else {
        return res.status(500).json({ message: "user not removed" });
    }
}

const editUser = async (req, res) => {
    const { id } = req.params;
    const { userName, email } = req.body;

    if (!id) {
        return res.status(400).json({ message: "user id is required" });
    }

    const response = await User.updateOne({ _id: id }, { userName, email });

    if (response) {
        return res.status(200).json({ message: "user edited successfully" });
    }
    else {
        return res.status(500).json({ message: "user not edited" });
    }
}

const allUser = async (req, res) => {
    const users = await User.find();

    if (users) {
        return res.status(200).json({ message: "user found successfully", data: users });
    }
    else {
        return res.status(500).json({ message: "user not found" });
    }
}

export {
    addUser,
    removeUser,
    editUser,
    allUser
}