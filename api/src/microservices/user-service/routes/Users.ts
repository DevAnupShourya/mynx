// ? Packages
import express from 'express';
const userRoute = express.Router();

// ? Controller
import { registerUser, loginUser, getAllUsernames } from '../controllers/Register';

// ? Database
import DatabaseConnection from '../config/Database';
DatabaseConnection();

// * Routes : /api/users/
userRoute.get('/usernames', getAllUsernames);
userRoute.post('/register', registerUser);
userRoute.post('/login', loginUser);

export default userRoute;