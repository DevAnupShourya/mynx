import mongoose from "mongoose";
import dotenv from "dotenv";
import infoLogger from '../utils/winstomLoggers';
dotenv.config();

const DatabaseURL = `${process.env.MONGODB_URL}`;

export default async function DatabaseConnetion() {
    infoLogger.warn("Trying to Established Database Connection...")
    try {
        await mongoose.connect(DatabaseURL);
        infoLogger.info("Database Connection Established Successfully!!")
    } catch (error) {
        console.error(`Database Connetion Failed to with error: ${error}`);
    }
}