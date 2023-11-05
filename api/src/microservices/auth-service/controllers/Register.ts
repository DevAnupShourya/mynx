import { Request, Response } from 'express';

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import User from '../models/UserModel';
import UserSession from '../models/UserSessionModel';

import infoLogger from '../utils/winstomLoggers';
import { responseError, responseInfo, responseWarn } from '../utils/apiResponseMsg';

export const registerUser = async (req: Request, res: Response) => {
    try {
        const { full_name, email, password, DOB }: { full_name: string, email: string, password: string, DOB: Date } = req.body;

        // ! 1. Validation : user jo dala hai wo sahi hai ki nhi front end me hi check kar l

        // ? Checking User Data Already Exist Or Not
        const userAvailable = await User.findOne({ email: email });

        if (userAvailable === null) {
            // ? If Not Exist Then Hashing The Password
            let salt = await bcrypt.genSalt(12);
            const hashedPassword = await bcrypt.hash(password, salt);

            // ? Saving The Data in Database
            const userData = await new User({ full_name: full_name, email: email, password: hashedPassword, DOB: DOB }).save();

            // ? Importing JWT TOken From config
            const JWT_SECRET = process.env.JWT_SECRET as string;
            const jwt_payload = { user: { id: userData._id } }
            const sessionToken = jwt.sign(jwt_payload, JWT_SECRET, { /* ! put some more options in her like expire value*/ });

            const UserSessionData = await new UserSession({
                user: userData._id,
                sessionToken: sessionToken
            }).save();

            responseInfo(res, 201, "User Saved!", { "id": userData._id, "sessionToken": UserSessionData.sessionToken });
        } else {
            // ? If Exist
            responseWarn(res, 400, "User Already Exist!!", null);
        }
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
        // ? Getting User Input
        const { email, password } = req.body;

        // ? Checking User Availablability
        const userAvailable = await User.findOne({ email: email });

        if (userAvailable === null) {
            // ? User Not Available
            responseWarn(res, 300, "User Not Exist!!", null);
        } else {
            // ? User Available then compare passwords
            const passwordComparison = await bcrypt.compare(password, userAvailable.password);

            if (passwordComparison === true) {
                const userSession = await UserSession.findOne({ user: userAvailable._id });
                responseInfo(res, 202, "User Found!", { "id": userSession?.user, "sessionToken": userSession?.sessionToken });

            } else {
                responseWarn(res, 300, "Password Not Matching!!", null);
            }
        }
    } catch (error) {
        responseError(res, 500, "Something Went Wrong Please Try Again Later!!!", null);
        return infoLogger.error({
            "status": "Error",
            "message": "Something Went Wrong Please Try Again Later!",
            "error": error
        });
    }
}