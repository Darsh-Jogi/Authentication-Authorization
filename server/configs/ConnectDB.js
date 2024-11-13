import mongoose from "mongoose"
export const ConnectDB = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGODB_URL)
        console.log("MongoDB Database connected")
    } catch (error) {
        console.error("Error connecting to MongoDB", error.message)
        process.exit(1)
    }
}