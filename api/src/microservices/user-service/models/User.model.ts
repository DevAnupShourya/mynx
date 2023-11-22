import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name Is Required!!'],
        index: true,
        max: [40, 'Name Should be less than 40 chars!!'],
        min: [3, 'Name Should be at least 3 chars!!'],
    },
    email: {
        type: String,
        required: [true, 'Email Is Required!!'],
        unique: [true, 'Email Already exists!!'],
    },
    username: {
        type: String,
        required: [true, 'Username Is Required!!'],
        unique: [true, 'Username Already Taken!!'],
        max: [50, 'Username Should be less than 50 chars!!'],
        min: [5, 'Username Should be at least 10 chars!!'],
    },
    country: {
        required: [true, 'Country Is Required!!'],
        type: String,
    },
    gender: {
        required: [true, 'Gender Is Required!!'],
        type: String,
    },
    bio: {
         required: [true, 'Bio Is Required!!'],
        type: String,
        max: 100,
        min: 10,
    },
    avatarURL: {
         required: [true, 'Avatar Image Is Required!!'],
        type: String,
    },
    coverURL: {
        required: [true, 'Cover Image Is Required!!'],
        type: String,
    },
    uId: {
        required: true,
        type: String,
    },
    following: {
        type: Number,
        default: 0
    },
    followers: {
        type: Number,
        default: 0
    },
},
    { timestamps: true }
)

const User = mongoose.model('user', userSchema);

export default User;