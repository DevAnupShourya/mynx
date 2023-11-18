import { Request, Response } from 'express';

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import User from '../models/User.model';

import infoLogger from '../utils/winstomLoggers';
import { responseError, responseInfo, responseWarn } from '../utils/apiResponseMsg';

export const registerUser = async (req: Request, res: Response) => {
    try {
        const user: {
            username: string,
            bio: string,
            avatarURL: string,
            coverURL: string,
            name: string,
            country: string,
            gender: string,
            email: string,
        } = req.body;

        // ? Saving The Data in Database
        const userData = await new User(user).save();
        responseInfo(res, 201, "User Saved!", { userData });

    } catch (error) {
        responseError(res, 500, "Something Went Wrong Please Try Again Later!!!", null);
        return infoLogger.error({
            "status": "Error",
            "message": "Something Went Wrong Please Try Again Later!",
            "error": error
        });
    }
}
export const getAllUsernames = async (req: Request, res: Response) => {
    try {
        const allUsernames = await User.find().select('username');;
        const usernameArray = allUsernames.map(user => user.username);
        const usernamesString = usernameArray.join(', ');
        responseInfo(res, 200, "All Usernames Found!", { usernames: usernamesString });
    } catch (error) {
        responseError(res, 500, "Something Went Wrong Please Try Again Later!!!", null);
        return infoLogger.error({
            "status": "Error",
            "message": "Something Went Wrong Please Try Again Later!",
            "error": error
        });
    }
}

export const loginUser = async (req: Request, res: Response) => {
    try {
        // // ? Getting User Input
        // const { email, password } = req.body;

        // // ? Checking User Availablability
        // const userAvailable = await User.findOne({ email: email });

        // if (userAvailable === null) {
        //     // ? User Not Available
        //     responseWarn(res, 300, "User Not Exist!!", null);
        // } else {
        //     // ? User Available then compare passwords
        //     const passwordComparison = await bcrypt.compare(password, userAvailable.password);

        //     if (passwordComparison === true) {
        //         const userSession = await UserSession.findOne({ user: userAvailable._id });
        //         responseInfo(res, 202, "User Found!", { "id": userSession?.user, "sessionToken": userSession?.sessionToken });

        //     } else {
        //         responseWarn(res, 300, "Password Not Matching!!", null);
        //     }
        // }
    } catch (error) {
        responseError(res, 500, "Something Went Wrong Please Try Again Later!!!", null);
        return infoLogger.error({
            "status": "Error",
            "message": "Something Went Wrong Please Try Again Later!",
            "error": error
        });
    }
}