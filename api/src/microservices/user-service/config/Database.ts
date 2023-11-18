import mongoose from "mongoose";
import dotenv from "dotenv";
import infoLogger from '../utils/winstomLoggers';
dotenv.config();

const DatabaseURL = `${process.env.MONGODB_URL}`;

export default async function DatabaseConnection() {
    try {
        infoLogger.info("Trying to Establish Database Connection....")
        await mongoose.connect(DatabaseURL);
        infoLogger.info("Database Connection Established Successfully.")
    } catch (error) {
        console.error(`Database Connection Failed to with error: ${error}`);
    }
}