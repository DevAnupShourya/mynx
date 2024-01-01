import mongoose, { Schema, Document } from "mongoose";
import bcrypt from 'bcrypt';

import Post from '~/v1/models/Post.model';

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
        default: 'NA',
        type: String,
    },
    gender: {
        default: 'NA',
        type: String,
    },
    bio: {
        type: String,
        default: '',
        max: 100,
        min: 10,
    },
    avatarURL: {
        type: String,
        default: '',
    },
    coverURL: {
        type: String,
        default: '',
    },
    password: {
        required: true,
        type: String,
    },
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
},
    { timestamps: true }
)

userSchema.pre('deleteOne', async function (this: Document, next) {
    await Post.deleteMany({ author: this._id });
    console.log('Deleted all Posts of this user also')
    next();
});

const User = mongoose.model('user', userSchema);

export default User;