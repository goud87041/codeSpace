import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
    title : {
        type : String ,
        required : true 
    },
    author : {
        type : String ,
        required : true
    },
    description : {
        type : String ,
        required : true
    },
    price : {
        type : Number ,
        required : true
    },
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 6198316 (Implement user and book routes with JWT authentication; add user registration and login functionality)
    user : {
        type : mongoose.Schema.Types.ObjectId ,
        ref : 'User'
    }
<<<<<<< HEAD
=======
>>>>>>> 3abe013 (Add book model and controller with CRUD operations)
=======
>>>>>>> 6198316 (Implement user and book routes with JWT authentication; add user registration and login functionality)
},{
    timestamps : true
})

const Book = mongoose.model('Book', bookSchema);
export default Book;