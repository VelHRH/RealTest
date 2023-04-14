import mongoose from "mongoose";
import { config } from "dotenv"

config();
export const dbConnection = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Db Connected');
    } catch (error) {
        console.log('Error ============')
        console.log(error);
        process.exit(1);
    }
};