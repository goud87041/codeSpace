import mongoose from "mongoose";

const connectDB = async () =>{
    try{
        const mongooseInstance = await mongoose.connect(process.env.MONGO_URI);
        console.log("mogoose connect successfully");
        
    }catch(err){
        console.log(err)
        process.exit(1)
    }
}

export default connectDB;