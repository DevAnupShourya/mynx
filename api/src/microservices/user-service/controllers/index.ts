import { Request, Response } from 'express';
import bcrypt from 'bcrypt';

import { responseError, responseInfo, responseWarn } from '~/microservices/user-service/utils/apiResponseMsg';
import createSecretToken from '~/microservices/user-service/utils/secretToken';
import User from '~/microservices/user-service/models/User.model';

export const signupUser = async (req: Request, res: Response) => {
    try {
        const user: {
            username: string,
            password: string,
            bio: string,
            avatarURL: string,
            coverURL: string,
            name: string,
            country: string,
            gender: string,
            email: string,
        } = req.body;

        // ? Checking email is already used or not
        const userAvailable = await User.findOne({ email: user.email })

        if (userAvailable) {
            responseInfo(res, 403, "Email Already used!", null);
        } else {
            // ? Saving User Data in DB
            const savedUser = await User.create({ ...user });

            // ? Generate a JWT token
            const tokenGenerated = createSecretToken(savedUser._id.toString());

            responseInfo(res, 202, "User Created Successfully!", { savedUser, token: tokenGenerated });
        }
    } catch (error) {
        responseError(res, 500, "Something Went Wrong Please Try Again Later!!!", null);
    }
}

export const loginUser = async (req: Request, res: Response) => {
    try {
        // ? Getting User Input
        const { email, password } = req.body;

        // ? Checking User Availability
        const userAvailable = await User.findOne({ email: email }).select('name email username avatarURL coverURL password');

        if (userAvailable === null) {
            // ? User Not Available
            responseWarn(res, 404, "No User Found", null);
        } else {
            // ? User Available then compare passwords
            const passwordComparison = await bcrypt.compare(password, userAvailable.password);
            if (passwordComparison === true) {
                // ? Generate a JWT token
                const tokenGenerated = createSecretToken(userAvailable._id.toString());
                responseInfo(res, 202, "User Found!", { userAvailable, token: tokenGenerated });
            } else {
                responseWarn(res, 403, "Wrong Credentials!!", null);
            }
        }
    } catch (error) {
        responseError(res, 500, "Something Went Wrong Please Try Again Later!!!", null);
    }
}

interface AuthenticatedRequest extends Request {
    userId?: String;
}

export const getUserInfo = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const userId = req.userId;
        const userInfo = await User.findById(userId).select('name email username avatarURL');
        if (userInfo) {
            responseInfo(res, 200, "User Found!", { userInfo });
        } else {
            responseWarn(res, 403, "User not found!!", null);
        }
    } catch (error) {
        responseError(res, 500, "Something Went Wrong Please Try Again Later!!!", null);
    }
};

export const checkUsernameAvailability = async (req: Request, res: Response) => {
    try {
        const usernameToCheck = req.query.username as string;
        const usernames = await User.find().select('username');
        const usernamesArray = usernames.map(user => user.username);

        let canUseQuery: boolean;
        if (usernamesArray.includes(usernameToCheck)) {
            canUseQuery = false;
            // responseInfo(res, 406, "Can Not Use This Username!", { canUseQuery });
            responseInfo(res, 200, "Can Not Use This Username!", { canUseQuery: 406 });
        } else {
            canUseQuery = true;
            // responseInfo(res, 200, "Feel Free to use This username.", { canUseQuery });
            responseInfo(res, 200, "Feel Free to use This username.", { canUseQuery: 200 });
        }
    } catch (error) {
        responseError(res, 500, "Something Went Wrong Please Try Again Later!!!", null);
    }
}

export const getUserById = async (req: Request, res: Response) => {
    try {
        const userId = req.query.userid;
        const user = await User.findOne({ _id: userId });
        if (user) {
            responseInfo(res, 200, "User Found!", { user });
        } else {
            responseError(res, 404, "No user Found", null);
        }
    } catch (error) {
        responseError(res, 500, "Something Went Wrong Please Try Again Later!!!", null);
    }
}

// ! https://www.freecodecamp.org/news/how-to-secure-your-mern-stack-application/