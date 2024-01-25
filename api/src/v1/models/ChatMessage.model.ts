import mongoose, { Schema } from "mongoose";

const chatMessageSchema = new Schema({
    sender: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    text: {
        type: String,
        default: ''
    },
    files: {
        type: [
            {
                url: String
            },
        ],
        default: [],
    },
    chatId: {
        type: Schema.Types.ObjectId,
        ref: "Chat",
        required: true
    },
}, { timestamps: true });

const ChatMessage = mongoose.model('ChatMessage', chatMessageSchema);

export default ChatMessage;