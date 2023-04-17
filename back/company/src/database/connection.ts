import mongoose from "mongoose";
import {MONGO_URI} from "../config"
export const dbConnection = async() => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('Db Connected');
    } catch (error) {
        console.log('Error ============')
        console.log(error);
        process.exit(1);
    }
};