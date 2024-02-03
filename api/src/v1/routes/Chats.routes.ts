import express from 'express';
const chatsRoute = express.Router();
// ? Middleware
import userVerification from '~/v1/middleware/userVerification';
import {
    getAllPersonalChatsOfCurrentUser,
    createOrGetPersonalChat,
    deleteChatById,
    getAllGroupChatsOfCurrentUser,
    createGroupChat,
    getGroupChat,
    updateGroupChat,
    addInGroupChat,
    removeInGroupChat,
    joinGroupChat,
    leaveGroupChat,
    getMessageById,
    deleteMessageById,
    updateMessageById,
    createNewMessage,
    getAllMessagesByChatId,
    getAllMessagesIdListByChatId,
    removeMemberByAdmin
} from '~/v1/controllers/ChatsController';


// ? Root Route : .../v1/chats/*

chatsRoute.route('/p').get(userVerification, getAllPersonalChatsOfCurrentUser); // * Get All Personal Chats created by current User

chatsRoute.route('/p/:userId').get(userVerification, createOrGetPersonalChat) // * Get One Personal Chat created by current User

chatsRoute.get('/g', userVerification, getAllGroupChatsOfCurrentUser); // * Get All Group Chats created by current User
chatsRoute.post('/g', userVerification, createGroupChat);  // * Create Group Chat as admin by current User

chatsRoute.route('/g/:groupId')
    .get(userVerification, getGroupChat) // * Get One Group Chat created by current User
    .put(userVerification, updateGroupChat) // * Update One Group Chat created by current User

chatsRoute.route('/delete/:chatId').delete(userVerification, deleteChatById); // * Delete Whole Chat and It's Messages

// ? Used By Group Admin
chatsRoute.route('/g/:groupId/:userId')
    .post(userVerification, addInGroupChat) // * Add one participant by id in group
    .delete(userVerification, removeInGroupChat); // * Remove one participant by id in group

// ? Used By Group Member
chatsRoute.post('/g/join/:groupId', userVerification, joinGroupChat); // * Join A Group by current User
chatsRoute.post('/g/leave/:groupId', userVerification, leaveGroupChat); // * Leave from Group by current User

chatsRoute.delete('/g/admin/:groupId/removeUser/:userId', userVerification, removeMemberByAdmin); // * Remove a member from a Group

chatsRoute.post('/m', userVerification, createNewMessage); // * Create a new Message in DB

// ? /all/m/:chatId?page=1
chatsRoute.get('/all/m/:chatId', userVerification, getAllMessagesByChatId); // * Get all messages of certain Chat Id
chatsRoute.get('/all/id/:chatId', userVerification, getAllMessagesIdListByChatId); // * Get all messages Id of certain Chat Id 

chatsRoute.route('/m/:messageId')
    .get(userVerification, getMessageById) // * Get One Message by it's Id
    .delete(userVerification, deleteMessageById) // * Delete One Message by it's Id
    .put(userVerification, updateMessageById); // * Update One Message by it's Id

export default chatsRoute;