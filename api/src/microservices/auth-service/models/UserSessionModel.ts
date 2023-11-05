import mongoose from "mongoose";

const UserSessionSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true,
        unique: true,
    },
    sessionToken: {
        type: String,
        unique: true,
        required: true,
    }
});

const UserSession = mongoose.model('usersession', UserSessionSchema);
export default UserSession;