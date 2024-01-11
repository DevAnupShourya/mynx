import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const DatabaseURL = `${process.env.MONGODB_URL}`;

export default async function DatabaseConnection() {
    try {
        console.log(`🚀 Trying to Establish Database Connection.... ${DatabaseURL} 🚀`)
        await mongoose.connect(DatabaseURL);
        console.warn("✔ Database Connection Established Successfully ✔")
    } catch (error) {
        console.error(`🔰 Database Connection Failed to with error: ${error} 🔰`);
    }
}
