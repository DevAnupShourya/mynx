// ? Packages
import express from 'express';
const userRoute = express.Router();

// ? Controller
import {
    signupUser,
    loginUser,
    getUserById,
    getUserByUsername,
    usernameAvailabilityStatus,
    getCurrentUserInfo,
    updateUserInfo,
    getAllUsers,
    deleteUserById,
    followOrUnfollowUserById
} from '~/v1/controllers/UserController';

// ? Middleware
import userVerification from '~/v1/middleware/userVerification';

// * Main Route : http://127.0.0.1:3300/api/users/ 
userRoute.post('/signup', signupUser);
userRoute.post('/login', loginUser);
userRoute.get('/u/:userId', userVerification, getUserById);
userRoute.get('/username', userVerification, getUserByUsername);
userRoute.get('/username-status', usernameAvailabilityStatus);
userRoute.get('/info', userVerification, getCurrentUserInfo);
userRoute.patch('/', userVerification, updateUserInfo);
userRoute.get('/', userVerification, getAllUsers);
userRoute.delete('/', userVerification, deleteUserById);
userRoute.put('/follow/:userId', userVerification, followOrUnfollowUserById);

export default userRoute;