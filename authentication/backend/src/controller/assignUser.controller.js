import AssignUser from "../model/assignUser.model.js";

const assignToUser = async (req, res) => {
    try {
        const { userName, email, role } = req.body;

        if (!userName || !email) {
            return res.status(400).json({ message: "User name and email are required" });
        }

        const existingUser = await AssignUser.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const user = await AssignUser.create({ userName, email, role });

        return res.status(201).json({ message: "User added successfully", data: user });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getAssignedUsers = async (req, res) => {
    try {
        const users = await AssignUser.find();

        return res.status(200).json({ message: "Users fetched successfully", data: users });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const removeAssignedUser = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await AssignUser.findByIdAndDelete(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ message: "User removed successfully", data: user });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export { assignToUser, getAssignedUsers, removeAssignedUser };
