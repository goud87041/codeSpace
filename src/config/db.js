import mongoose from "mongoose";


const mongooseInstence = async () => {
    try {
        const mongoosecon = await mongoose.connect(
            process.env.MONGO_URL
        )

        console.log(`mongoose connect successfully`)
    } catch (error) {
        console.error(error,"some thing went wrong in db connection")
        process.exsit(1)
    }
}

export default mongooseInstence