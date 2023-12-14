// ? Packages
import express from 'express';
const userRoute = express.Router();

// ? Controller
import { signupUser, loginUser, checkUsernameAvailability, getUserById, getUserInfo, getUserByUsername } from '~/controllers';

// ? Middleware
import userVerification from '~/middleware/userVerification'

// * Route : http://127.0.0.1:3300/api/users/
// ? For Making an account
userRoute.post('/signup', signupUser);
// ? For Authenticating an account
userRoute.post('/login', loginUser);
// ? For Checking if certain username is available to use or not
userRoute.get('/usernames', checkUsernameAvailability); // * with api/users/usernames?username=[input]
// ? For finding a user with certain id
userRoute.get('/', userVerification, getUserById); // * with api/users?userid=[input]
// ? For finding a user with id
userRoute.get('/current', userVerification, getUserInfo);

userRoute.get('/username', userVerification, getUserByUsername); // * with api/users/username?username=[input]

export default userRoute;