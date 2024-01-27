import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { createGroupValidation, createMessageValidation } from '~/v1/types/Joi.schemas';

import { responseError, responseInfo, responseWarn } from '~/v1/utils/apiResponseMsg';
import Chat from '~/v1/models/Chat.model';
import User from '~/v1/models/User.model';
import ChatMessage from '~/v1/models/ChatMessage.model';

interface AuthenticatedRequest extends Request {
    userId?: mongoose.Types.ObjectId;
}

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
        console.error(error)
        responseError(res, 500, error.message, null);
    }
};

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
        console.error(error)
        return responseError(res, 500, error.message, null);
    }

};

export const getAllGroupChatsOfCurrentUser = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const chatInitiator = req.userId;
        const groupChatsList = await Chat.find({
            isGroup: true,
            participants: {
                $eq: chatInitiator
            }
        })

        return responseInfo(res, 200, 'Your Group Chats List', groupChatsList);
    } catch (error: any) {
        console.error(error)
        responseError(res, 500, error.message, null);
    }
};

export const createGroupChat = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const groupAdmin = req.userId;
        const groupData = req.body;

        const filteredGroupData = await createGroupValidation.validateAsync(groupData);
        const groupChat = await Chat.create({
            isGroup: true,
            groupName: filteredGroupData.groupName,
            groupDescription: filteredGroupData.groupDescription,
            participants: filteredGroupData.participants,
            admin: groupAdmin
        })

        const firstMessage = await ChatMessage.create({
            sender: groupAdmin,
            text: "Chat Initiated",
            chatId: groupChat._id
        })

        await Chat.findByIdAndUpdate(groupChat._id, {
            lastMessage: firstMessage._id
        })

        return responseInfo(res, 200, 'Your Group Chat Created', groupChat);

    } catch (error: any) {
        console.error(error)
        responseError(res, 500, error.message, null);
    }
};

export const getGroupChat = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const groupParticipant = req.userId;
        const groupId = req.params.groupId;

        // Check if valid Mongoose Id or not
        if (!mongoose.Types.ObjectId.isValid(groupId)) {
            return responseWarn(res, 403, 'The Group ID is Invalid!', null);
        }

        const groupChat = await Chat.findOne({
            isGroup: true,
            participants: {
                $eq: groupParticipant
            }
        });

        if (!groupChat) {
            return responseWarn(res, 404, 'The Group with this ID not found!', null);
        }

        return responseInfo(res, 200, 'Group Found', groupChat);
    } catch (error: any) {
        console.error(error)
        responseError(res, 500, error.message, null);
    }
};

export const updateGroupChat = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const groupParticipant = req.userId;
        const groupIdToUpdate = req.params.groupId;
        const groupDataToUpdate = req.body;

        const filteredGroupData = await createGroupValidation.validateAsync(groupDataToUpdate);

        // Check if valid Mongoose Id or not
        if (!mongoose.Types.ObjectId.isValid(groupIdToUpdate)) {
            return responseWarn(res, 403, 'The Group ID is Invalid!', null);
        }

        const groupChatToUpdate = await Chat.findById(groupIdToUpdate);

        if (!groupChatToUpdate) {
            return responseWarn(res, 404, 'The Group with this ID not found!', null);
        }

        if (!(groupChatToUpdate.admin === groupParticipant)) {
            return responseWarn(res, 403, 'Only Admin Can Update Group Details', null);
        }

        const updatedGroupDetails = await Chat.findByIdAndUpdate(groupIdToUpdate, {
            groupName: filteredGroupData.groupName,
            groupDescription: filteredGroupData.groupDescription,
            participants: filteredGroupData.participants
        }, { new: true })

        return responseInfo(res, 200, 'Updated Group Details.', updatedGroupDetails);

    } catch (error: any) {
        console.error(error)
        responseError(res, 500, error.message, null);
    }
};

export const deleteChatById = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const responseInitiator = req.userId;
        const chatId = req.params.chatId;

        // Check if valid Mongoose Id or not
        if (!mongoose.Types.ObjectId.isValid(chatId)) {
            return responseWarn(res, 404, 'The Chat ID is Invalid!', null);
        }

        // Check if any chat is available or not
        const chatById = await Chat.findById(chatId);

        if (!chatById) {
            return responseWarn(res, 403, "No Chat Found with this Id", null);
        }

        // check if responseInitiator is admin or not
        if (!(chatById?.admin === responseInitiator)) {
            return responseWarn(res, 403, "Only User who initiated the chat can delete!", null);
        }

        const deletedChat = await Chat.findByIdAndDelete(chatId);
        const deletedMessagesOfChat = await ChatMessage.deleteMany({ chatId: chatId });

        if (!deletedChat) {
            return responseWarn(res, 404, "Chat not found or already deleted", null);
        }

        if (!deletedMessagesOfChat) {
            return responseWarn(res, 404, "Chat's Messages not found or already deleted", null);
        }

        return responseInfo(res, 200, `Deleted Chat and its messages`, null);

    } catch (error: any) {
        console.error(error)
        responseError(res, 500, error.message, null);
    }
};

export const addInGroupChat = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const groupAdminShouldBe = req.userId;
        const groupId = req.params.groupId;
        const userIdToAdd = req.params.userId;

        // Check if valid Mongoose Id or not
        if (!mongoose.Types.ObjectId.isValid(groupId)) {
            return responseWarn(res, 404, 'The Group ID is Invalid!', null);
        }
        if (!mongoose.Types.ObjectId.isValid(userIdToAdd)) {
            return responseWarn(res, 404, 'The User ID is Invalid!', null);
        }

        const groupById = await Chat.findById(groupId);
        if (!groupById) {
            return responseWarn(res, 403, "No Group Found with this Group Id", null);
        }

        const userById = await User.findById(userIdToAdd);
        if (!userById) {
            return responseWarn(res, 403, "No User Found with this User Id", null);
        }

        if (!(groupById.admin === groupAdminShouldBe)) {
            return responseWarn(res, 404, 'Only Admin can add members in this group!', null);
        }

        const oldParticipants = groupById.participants;
        oldParticipants.push(userById._id);

        const updatedGroupDetails = await Chat.findByIdAndUpdate(groupById._id, {
            participants: oldParticipants
        }, { new: true });

        return responseInfo(res, 200, `Added ${userById.name} in ${groupById.groupName}`, updatedGroupDetails);
    } catch (error: any) {
        console.error(error)
        responseError(res, 500, error.message, null);
    }
};

export const removeInGroupChat = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const groupAdminShouldBe = req.userId;
        const groupId = req.params.groupId;
        const userIdToAdd = req.params.userId;

        // Check if valid Mongoose Id or not
        if (!mongoose.Types.ObjectId.isValid(groupId)) {
            return responseWarn(res, 404, 'The Group ID is Invalid!', null);
        }
        if (!mongoose.Types.ObjectId.isValid(userIdToAdd)) {
            return responseWarn(res, 404, 'The User ID is Invalid!', null);
        }

        const groupById = await Chat.findById(groupId);
        if (!groupById) {
            return responseWarn(res, 403, "No Group Found with this Group Id", null);
        }

        const userById = await User.findById(userIdToAdd);
        if (!userById) {
            return responseWarn(res, 403, "No User Found with this User Id", null);
        }

        if (!(groupById.admin === groupAdminShouldBe)) {
            return responseWarn(res, 404, 'Only Admin can remove members in this group!', null);
        }

        const oldParticipants = groupById.participants.filter((userId) => userId != userById._id);

        const updatedGroupDetails = await Chat.findByIdAndUpdate(groupById._id, {
            participants: oldParticipants
        }, { new: true });

        return responseInfo(res, 200, `Remove ${userById.name} from ${groupById.groupName}`, updatedGroupDetails);

    } catch (error: any) {
        console.error(error)
        responseError(res, 500, error.message, null);
    }
};

export const joinGroupChat = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const userIdWantToJoin = req.userId;
        const groupId = req.params.groupId;

        if (!mongoose.Types.ObjectId.isValid(groupId)) {
            return responseWarn(res, 404, 'The User ID is Invalid!', null);
        }

        const groupById = await Chat.findById(groupId);
        if (!groupById) {
            return responseWarn(res, 403, "No Group Found with this Group Id", null);
        }

        const oldParticipants = groupById.participants;
        oldParticipants.push(new mongoose.Types.ObjectId(userIdWantToJoin));

        const updatedGroupDetails = await Chat.findByIdAndUpdate(groupById._id, {
            participants: oldParticipants
        }, { new: true });

        return responseInfo(res, 200, `You Joined ${groupById.groupName}`, updatedGroupDetails);
    } catch (error: any) {
        console.error(error)
        responseError(res, 500, error.message, null);
    }
};

export const leaveGroupChat = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const userIdWantToJoin = req.userId;
        const groupId = req.params.groupId;

        if (!mongoose.Types.ObjectId.isValid(groupId)) {
            return responseWarn(res, 404, 'The User ID is Invalid!', null);
        }

        const groupById = await Chat.findById(groupId);
        if (!groupById) {
            return responseWarn(res, 403, "No Group Found with this Group Id", null);
        }

        const oldParticipants = groupById.participants.filter((userId) => userId != new mongoose.Types.ObjectId(userIdWantToJoin));

        const updatedGroupDetails = await Chat.findByIdAndUpdate(groupById._id, {
            participants: oldParticipants
        }, { new: true });

        return responseInfo(res, 200, `You Left ${groupById.groupName}`, updatedGroupDetails);
    } catch (error: any) {
        console.error(error)
        responseError(res, 500, error.message, null);
    }
};

export const createNewMessage = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const senderId = req.userId;
        const messageData = req.body;

        const filteredMessageData = await createMessageValidation.validateAsync(messageData);
        const newMessage = await ChatMessage.create({
            ...filteredMessageData,
            sender: senderId
        });

        return responseInfo(res, 202, 'New Message', newMessage);
    } catch (error: any) {
        console.error(error)
        responseError(res, 500, error.message, null);
    }
};

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

        const allMessagesData = await ChatMessage.find({ chatId: chatId })
            .sort({ createdAt: -1 });

        return responseInfo(res, 200, `Messages`, allMessagesData);
    } catch (error: any) {
        console.error(error)
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
        console.error(error)
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
        console.error(error)
        responseError(res, 500, error.message, null);
    }
};

export const updateMessageById = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const adminShouldBe = req.userId;
        const messageIdToUpdate = req.params.messageId;
        const messageDataToUpdate = req.body;

        const filteredMessageData = await createMessageValidation.validateAsync(messageDataToUpdate);

        // ? Check if valid Mongoose Id or not
        if (!mongoose.Types.ObjectId.isValid(messageIdToUpdate)) {
            return responseWarn(res, 400, 'The Message ID is Invalid!', null);
        }

        const messageToUpdate = await ChatMessage.findById(messageIdToUpdate)
        if (!messageToUpdate) {
            return responseWarn(res, 404, 'No Message Found with this ID!', null);
        }

        if (!(messageToUpdate.sender === adminShouldBe)) {
            return responseWarn(res, 403, 'Only Message Sender can update!', null);
        }

        const newMessage = await ChatMessage.findByIdAndUpdate(messageIdToUpdate, {
            ...filteredMessageData,
            sender: adminShouldBe
        });

        return responseInfo(res, 202, 'Message Updated', newMessage);
    } catch (error: any) {
        console.error(error)
        responseError(res, 500, error.message, null);
    }
};
