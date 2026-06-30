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
<<<<<<< HEAD

export default User ;
=======
>>>>>>> 0bafcd5 (Add user model schema with validation for username, email, and password)
=======

export default User ;
>>>>>>> 20a69a4 (Fix import paths in controllers and routes; update to use .js extension)
