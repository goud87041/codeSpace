import mongoose from "mongoose";


const userSchema = new mongoose.Schema({

    userName :{
        required : true ,
        type : String 
    },
    email: {
        required : true ,
        type : String 
    },
    password : {
        required : true ,
        type : String
    }

},{timestamps:true});

const User = mongoose.model('User', userSchema);
<<<<<<< HEAD

export default User ;
=======
>>>>>>> 0bafcd5 (Add user model schema with validation for username, email, and password)
