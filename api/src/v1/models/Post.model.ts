import mongoose, { Schema } from "mongoose";

const postSchema = new Schema({
    title: {
        type: String,
        default: null,
    },
    description: {
        type: String,
        default: null,
    },
    videoURL: {
        type: [String],
        default: null,
    },
    imagesURL: {
        type: [String],
        default: null,
    },
    pollOptions: {
        type: [
            {
                pollName: {
                    type: String,
                    required: true,
                },
                pollCount: {
                    type: Number,
                    default: 0,
                },
            },
        ],
        default: null
    },
    postType: {
        type: String,
        enum: ['Vixet', 'Vixdeo', 'Vixsnap', 'Vixogs', 'Vixpoll', 'Vixlive'],
        required: true,
    },
    tags: {
        type: [String],
        required: true,
    },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

}, { timestamps: true });

const Post = mongoose.model('post', postSchema);

export default Post;