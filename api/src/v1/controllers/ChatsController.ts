import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { chatCreateValidation } from '~/v1/types/Joi.schemas';

import { responseError, responseInfo, responseWarn } from '~/v1/utils/apiResponseMsg';
import Chat from '~/v1/models/Chat.model';
import User from '~/v1/models/User.model';
import ChatMessage from '~/v1/models/ChatMessage.model';

interface AuthenticatedRequest extends Request {
    userId?: mongoose.Types.ObjectId;
}

export const createOrGetPersonalChat = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const chatInitiator = req.userId;
        const chatWithId = req.params.userId;

        // Check if valid Mongoose Id or not
        if (!mongoose.Types.ObjectId.isValid(chatWithId)) {
            return responseWarn(res, 404, 'The User ID you want to chat with is Invalid!', null);
        }

        // Check if User exists or not
        const chatWithUser = await User.findById(chatWithId);
        if (!chatWithUser) {
            return responseWarn(res, 404, 'The User you want to chat with Does Not Exist!', null);
        }

        // Check if having chat with self or not
        if (new mongoose.Types.ObjectId(chatInitiator) === new mongoose.Types.ObjectId(chatWithId)) {
            return responseWarn(res, 403, 'You cannot chat with yourself!', null);
        }

        const chatsList = await Chat.findOne({
            participants: {
                $all: [chatInitiator, chatWithId]
            }
        })

        // If Chatted before then will return
        if (chatsList) {
            return responseInfo(res, 200, 'Found Your Chat', chatsList);
        }

        // If not Chatted before then will create a new chat with first message
        const newChat = await Chat.create({
            admin: chatInitiator,
            isGroup: false,
            participants: [chatInitiator, chatWithId],
        });

        const firstMessage = await ChatMessage.create({
            sender: chatInitiator,
            text: "Chat Initiated",
            chatId: newChat._id
        })

        await Chat.findByIdAndUpdate(newChat._id, {
            lastMessage: firstMessage._id
        })

        return responseInfo(res, 200, 'Your Chat Created', newChat);

    } catch (error: any) {
        return responseError(res, 500, error.message, null);
    }

};

export const getAllPersonalChatsOfCurrentUser = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const chatInitiator = req.userId;
        const chatsList = await Chat.find({
            isGroup: false,
            participants: {
                $eq: chatInitiator
            }
        })

        return responseInfo(res, 200, 'Your Personal Chats List', chatsList);

    } catch (error: any) {
        responseError(res, 500, error.message, null);
    }
};

export const createNewMessage = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const senderId = req.userId;
        const messageData = req.body;

        const newMessage = await ChatMessage.create({
            sender: senderId,
            text: messageData.text,
            chatId: messageData.chatId,
        })

        return responseInfo(res, 202, 'Message Created', newMessage);

    } catch (error: any) {
        responseError(res, 500, error.message, null);
    }
};

// ! add pagination  with date
export const getAllMessagesByChatId = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const { chatId } = req.params;
        // ? Check if valid Mongoose Id or not
        if (!mongoose.Types.ObjectId.isValid(chatId)) {
            return responseWarn(res, 403, 'The Chat ID is Invalid!', null);
        }

        // ? Check if Chat exists or not
        const chatData = await Chat.findById(chatId);
        if (!chatData) {
            return responseWarn(res, 404, 'This Chat Does Not Exist!', null);
        }

        const allMessagesData = await ChatMessage.find({ chatId: chatId });

        return responseInfo(res, 200, 'All Messages', allMessagesData);
    } catch (error: any) {
        responseError(res, 500, error.message, null);
    }
};

export const getMessageById = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const messageId = req.params.messageId;

        // ? Check if valid Mongoose Id or not
        if (!mongoose.Types.ObjectId.isValid(messageId)) {
            return responseWarn(res, 404, 'The Message ID is Invalid!', null);
        }

        // ? Check if Message exists or not
        const messageData = await ChatMessage.findById(messageId);
        if (!messageData) {
            return responseWarn(res, 404, 'This Message Does Not Exist!', null);
        }

        return responseInfo(res, 200, 'Message', messageData);

    } catch (error: any) {
        responseError(res, 500, error.message, null);
    }
};

export const deleteMessageById = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const messageId = req.params.messageId;
        // ? Check if valid Mongoose Id or not
        if (!mongoose.Types.ObjectId.isValid(messageId)) {
            return responseWarn(res, 404, 'The Message ID is Invalid!', null);
        }

        // ? Check if Message exists or not
        const deletedMessageData = await ChatMessage.findByIdAndDelete(messageId);
        if (!deletedMessageData) {
            return responseWarn(res, 500, 'Server Error', null);
        }

        return responseWarn(res, 200, 'Message Deleted', deletedMessageData);
    } catch (error: any) {
        responseError(res, 500, error.message, null);
    }
};

export const updateMessageById = async (req: AuthenticatedRequest, res: Response) => {
    try {
        // TODO

    } catch (error: any) {
        responseError(res, 500, error.message, null);
    }
};

export const deletePersonalChat = async (req: AuthenticatedRequest, res: Response) => {
    try {

        // Do

    } catch (error: any) {
        responseError(res, 500, error.message, null);
    }
};

export const updatePersonalChat = async (req: AuthenticatedRequest, res: Response) => {
    try {

        // Do

    } catch (error: any) {
        responseError(res, 500, error.message, null);
    }
};

export const getAllGroupChatsOfCurrentUser = async (req: AuthenticatedRequest, res: Response) => {
    try {

        // Do

    } catch (error: any) {
        responseError(res, 500, error.message, null);
    }
};

export const createOrGetGroupChat = async (req: AuthenticatedRequest, res: Response) => {
    try {

        // Do

    } catch (error: any) {
        responseError(res, 500, error.message, null);
    }
};

export const updateGroupChat = async (req: AuthenticatedRequest, res: Response) => {
    try {

        // Do

    } catch (error: any) {
        responseError(res, 500, error.message, null);
    }
};

export const deleteGroupChat = async (req: AuthenticatedRequest, res: Response) => {
    try {

        // Do

    } catch (error: any) {
        responseError(res, 500, error.message, null);
    }
};

export const addInGroupChat = async (req: AuthenticatedRequest, res: Response) => {
    try {

        // Do

    } catch (error: any) {
        responseError(res, 500, error.message, null);
    }
};

export const removeInGroupChat = async (req: AuthenticatedRequest, res: Response) => {
    try {

        // Do

    } catch (error: any) {
        responseError(res, 500, error.message, null);
    }
};

export const leaveGroupChat = async (req: AuthenticatedRequest, res: Response) => {
    try {

        // Do

    } catch (error: any) {
        responseError(res, 500, error.message, null);
    }
};

export const getAvailableUsersToChat = async (req: AuthenticatedRequest, res: Response) => {
    try {

        // Do

    } catch (error: any) {
        responseError(res, 500, error.message, null);
    }
};
