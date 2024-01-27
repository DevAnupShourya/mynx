import mongoose, { Schema } from "mongoose";

// ? Will Be Used fro Both Personal Chats and Group Chats
const chatSchema = new Schema({
    isGroup: {
        type: Boolean,
        default: false,
    },
    groupName: {
        type: String,
        default: '',
    },
    groupDescription: {
        type: String,
        default: ''
    },
    lastMessage: [
        {
            type: Schema.Types.ObjectId,
            ref: "ChatMessage",
        }
    ],
    participants: [
        {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
    ],
    admin: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
}, { timestamps: true });

const Chat = mongoose.model('Chat', chatSchema);

export default Chat;