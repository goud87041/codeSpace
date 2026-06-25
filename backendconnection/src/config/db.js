import mongoose from "mongoose";


const connectDB  = async() => {
    try{
        console.log("Connecting to MongoDB...");
        // console.log(process.env.MONGO_URI);
        const conn = await mongoose.connect(process.env.MONGO_URI);
    }catch(err){
        console.error("Error connecting to MongoDB:", err);
        process.exit(1);
    }
}

export default connectDB;