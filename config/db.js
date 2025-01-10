import mongoose from "mongoose";
import dotenv from 'dotenv'

dotenv.config();

const connectDB = async () => {
    try {
        if(!process.env.MONGO_URI){
            throw new Error('MongoDB connection string is not defined in environment variables');
        }
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Mongodb Connected');
    } catch (error) {
        console.error(error.message);
        process.exit(1);
    }
}

export default connectDB;