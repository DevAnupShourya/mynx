// ? Packages
import express from 'express';
const userRoute = express.Router();

// ? Controller
import { signupUser, loginUser, checkUsernameAvailability, getUserById, getUserInfo } from '~/microservices/user-service/controllers';

// ? Database
import DatabaseConnection from '~/microservices/user-service/config/Database';
DatabaseConnection();

// ? Middleware
import userVerification from '~/microservices/user-service/middleware/userVerification'

// * Route : http://127.0.0.1:3300/api/users/
userRoute.post('/signup', signupUser);
userRoute.post('/login', loginUser);
userRoute.get('/usernames', checkUsernameAvailability); // * with api/users/usernames?username=[input]
userRoute.get('/', userVerification, getUserById); // * with api/users?userid=[input]
userRoute.get('/current', userVerification, getUserInfo);

export default userRoute;