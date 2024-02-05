import express from 'express';
const userRoute = express.Router();

// ? Controllers
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

// * Root Route : .../v1/users/*
userRoute.post('/signup', signupUser);
userRoute.post('/login', loginUser);
userRoute.get('/u/:userId', userVerification, getUserById);
userRoute.get('/username', userVerification, getUserByUsername);
userRoute.get('/username-status', usernameAvailabilityStatus);
userRoute.get('/info', userVerification, getCurrentUserInfo);
userRoute.put('/follow/:userId', userVerification, followOrUnfollowUserById);
userRoute.route('/')
    .patch(userVerification, updateUserInfo)
    .get(userVerification, getAllUsers)
    .delete(userVerification, deleteUserById);

export default userRoute;