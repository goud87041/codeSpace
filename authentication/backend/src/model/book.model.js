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
    user : {
        type : mongoose.Schema.Types.ObjectId ,
        ref : 'User'
    }
=======
>>>>>>> 3abe013 (Add book model and controller with CRUD operations)
},{
    timestamps : true
})

const Book = mongoose.model('Book', bookSchema);
export default Book;