import mongoose from "mongoose";


const assignUserSchema = new mongoose.Schema(
   {
    userName: {
        required: true,
        type: String,
    },
    email: {
        required: true,
        type: String,
    },
    role: {
        type: String,
        enum: ["user"],
        default: "user",
    }
   }
)

 const AssignUser = mongoose.model("AssignUser", assignUserSchema)

 export default AssignUser;