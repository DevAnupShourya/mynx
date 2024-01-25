import express from 'express';
const chatsRoute = express.Router();
// ? Middleware
import userVerification from '~/v1/middleware/userVerification';
import {
    getAllPersonalChatsOfCurrentUser,
    createOrGetPersonalChat,
    deletePersonalChat,
    updatePersonalChat,
    getAllGroupChatsOfCurrentUser,
    createOrGetGroupChat,
    updateGroupChat,
    deleteGroupChat,
    addInGroupChat,
    removeInGroupChat,
    leaveGroupChat,
    getAvailableUsersToChat,
    getMessageById,
    deleteMessageById,
    updateMessageById,
    createNewMessage,
    getAllMessagesByChatId
} from '~/v1/controllers/ChatsController';


// ? Root Route : .../v1/chats/*
chatsRoute.route('/p').get(userVerification, getAllPersonalChatsOfCurrentUser); // * Get All Personal Chats created by current User
chatsRoute.route('/p/:userId')
    .get(userVerification, createOrGetPersonalChat) // * Get One Personal Chat created by current User
    .delete(userVerification, deletePersonalChat) // * Delete One Personal Chat created by current User
    .put(userVerification, updatePersonalChat); // * Update One Personal Chat created by current User

chatsRoute.get('/g', userVerification, getAllGroupChatsOfCurrentUser); // * Get All Group Chats created by current User
chatsRoute.route('/g/:groupId')
    .get(userVerification, createOrGetGroupChat) // * Get One Group Chat created by current User
    .put(userVerification, updateGroupChat) // * Update One Group Chat created by current User
    .delete(userVerification, deleteGroupChat); // * Delete One Group Chat created by current User

chatsRoute.route('/g/:groupId/:userId')
    .post(userVerification, addInGroupChat) // * Add one participant by id in group
    .delete(userVerification, removeInGroupChat); // * Remove one participant by id in group

chatsRoute.delete('/g/leave/:groupId/', userVerification, leaveGroupChat); // * Leave from Group by current User

chatsRoute.post('/m', userVerification, createNewMessage); // * Create a new Message in DB
chatsRoute.get('/all/m/:chatId', userVerification, getAllMessagesByChatId); // * Create a new Message in DB
chatsRoute.route('/m/:messageId') // TODO For Searching by ChatId
    .get(userVerification, getMessageById) // * Get One Message by it's Id
    .delete(userVerification, deleteMessageById) // * Delete One Message by it's Id
    .put(userVerification, updateMessageById); // * Update One Message by it's Id

chatsRoute.get('/users', userVerification, getAvailableUsersToChat); // * Get List of Users to Chat with

export default chatsRoute;