import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    full_name: {
        type: String,
        minLength : 5,
        maxLength : 100,
        required: true,
        unique : true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique : true
    },
    password: {
        type: String,
        minLength : 5,
        required: true,
    },
    DOB: {
        type: Date,
        default : '05/08/2023'
    },
    dateCreated: {
        type: Date,
        default: Date.now()
    },
    lastUpdated: {
        type: Date,
        default: Date.now()
    }
});

const User = mongoose.model('user', UserSchema);

export default User;