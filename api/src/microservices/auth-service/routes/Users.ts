// ? Packages
import express from 'express';
import validator from "validator";
const userRoute = express.Router();

// ? Controller
import { registerUser, loginUser } from '../controllers/Register';

// ? Database
import DatabaseConnetion from '../config/Database';
DatabaseConnetion();

// ? Routes
userRoute.post('/register', registerUser);
userRoute.post('/login', loginUser);

export default userRoute;