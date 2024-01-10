import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import { userSignUpSchema, userLoginSchema, userUpdateSchema } from '~/v1/types/Joi.schemas';

import { responseError, responseInfo, responseWarn } from '~/v1/utils/apiResponseMsg';
import createSecretToken from '~/v1/utils/secretToken';
import User from '~/v1/models/User.model';
import Post from '../models/Post.model';

interface AuthenticatedRequest extends Request {
    userId?: mongoose.Types.ObjectId;
}

export const signupUser = async (req: Request, res: Response) => {
    try {
        const user = req.body;

        // ? Validating the user object against the schema
        const userData = await userSignUpSchema.validateAsync(user);

        // ? Checking email is already used or not
        const userAvailable = await User.findOne({ email: userData.email })

        if (userAvailable) {
            responseWarn(res, 403, "Email Already used!", null);
        } else {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(userData.password, salt);
            // ? Saving User Data in DB
            const savedUser = await User.create({ ...userData, password: hashedPassword });
            // ? Generate a JWT token
            const tokenGenerated = createSecretToken(savedUser._id.toString());

            // ? Selecting specific fields for response
            const newUserData = savedUser.toObject({ transform: (_, ret) => ({ username: ret.username, email: ret.email, avatarURL: ret.avatarURL, name: ret.name }) });

            responseInfo(res, 202, "User Created Successfully!", { newUserData, token: tokenGenerated });
        }
    } catch (error: any) {
        console.log(error)
        responseError(res, 500, error.message, null);
    }
}

export const loginUser = async (req: Request, res: Response) => {
    try {
        // ? Getting User Input
        const userCredentials = req.body;

        // ? Validating the user object against the schema
        const userCredentialsFiltered = await userLoginSchema.validateAsync(userCredentials);

        // ? Checking User Availability
        const userAvailable = await User.findOne({ email: userCredentialsFiltered.email }).select('name email username avatarURL password');

        if (userAvailable === null) {
            // ? User Not Available
            responseWarn(res, 404, "No User Found", null);
        } else {
            // ? User Available then compare passwords
            const passwordComparison = await bcrypt.compare(userCredentialsFiltered.password, userAvailable.password);

            if (passwordComparison === true) {
                // ? Generate a JWT token
                const tokenGenerated = createSecretToken(userAvailable._id.toString());
                responseInfo(res, 202, "User Found!", { userAvailable, token: tokenGenerated });
            } else {
                responseWarn(res, 403, "Wrong Credentials!!", null);
            }
        }
    } catch (error: any) {
        console.log(error)
        responseError(res, 500, error.message, null);
    }
}

export const getCurrentUserInfo = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const userId = req.userId;
        const userInfo = await User.findById(userId).select('-posts -following -followers -createdAt');

        if (userInfo) {
            responseInfo(res, 200, "User Found!", { userInfo });
        } else {
            responseWarn(res, 403, "User not found!!", null);
        }
    } catch (error: any) {
        console.log(error)
        responseError(res, 500, error.message, null);
    }
};

export const usernameAvailabilityStatus = async (req: Request, res: Response) => {
    try {
        const usernameToCheck = req.query.username as string;
        const usernames = await User.find().select('username');
        const usernamesArray = usernames.map(user => user.username);

        if (usernamesArray.includes(usernameToCheck)) {
            responseWarn(res, 200, "Can Not Use This Username!", { canUseQuery: false });
        } else {
            responseInfo(res, 200, "Feel Free to use This username.", { canUseQuery: true });
        }
    } catch (error: any) {
        console.log(error)
        responseError(res, 500, error.message, null);
    }
}

export const getUserById = async (req: Request, res: Response) => {
    try {
        const userId = req.params.userId as string;

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return responseError(res, 404, "Invalid User Id", null);
        }

        const user = await User.findOne({ _id: userId }, { password: 0, updatedAt: 0, _id: 0 });
        if (user) {
            return responseInfo(res, 200, "User Found!", { user });
        } else {
            return responseWarn(res, 404, "No user Found", null);
        }
    } catch (error: any) {
        console.log(error)
        return responseError(res, 500, error.message, null);
    }
}

export const getUserByUsername = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const usernameToCheck = req.query.username as string;
        const userFromDB = await User.findOne({ username: usernameToCheck }).select('-password -updatedAt');

        if (userFromDB) {
            responseInfo(res, 200, "Found this User : ", { userFromDB, isFollowedByMe: userFromDB.followers.includes(req.userId!) });
        } else {
            responseWarn(res, 200, "No User Found with this Username!", userFromDB);
        }
    } catch (error: any) {
        console.log(error)
        responseError(res, 500, error.message, null);
    }
}

export const updateUserInfo = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const dataToUpdate = req.body;
        // ? Validating the user object against the schema
        const dataToUpdateFiltered = await userUpdateSchema.validateAsync(dataToUpdate);
        const userProfile = await User.findById(req.userId);

        // ? Both should be hashed password if password not changed by user
        if (userProfile?.password !== dataToUpdateFiltered.password) {
            // ? generating new password hash
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(dataToUpdateFiltered.password, salt);
            const userToEdit = await User.findByIdAndUpdate(req.userId, { ...dataToUpdateFiltered, password: hashedPassword }, { new: true });
            responseInfo(res, 200, `${userToEdit?.name}'s Values Updated.`, { userToEdit });
        } else {
            const userToEdit = await User.findByIdAndUpdate(req.userId, dataToUpdateFiltered, { new: true });
            responseInfo(res, 200, `${userToEdit?.name}'s Values Updated.`, { userToEdit });
        }
    } catch (error: any) {
        console.log(error)
        responseError(res, 500, error.message, error);
    }
}

export const getAllUsers = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;
        const totalPosts = await User.estimatedDocumentCount();
        const totalPages = Math.ceil(totalPosts / limit);

        const hasNextPage = page < totalPages;
        const hasPrevPage = page > 1;
        const nextPage = hasNextPage ? page + 1 : null;

        const allUsers = await User.find({})
            .select('-_id -password -updatedAt')
            .skip((page - 1) * limit)
            .limit(limit)
            .sort({ createdAt: -1 }); // * Sorting by createdAt in descending order (newer posts comes first)

        responseInfo(res, 200, "All Available Posts!", {
            totalPages,
            hasNextPage,
            hasPrevPage,
            nextPage,
            limit,
            currentPage: page,
            allUsers,
        });
    } catch (error: any) {
        console.log(error)
        responseError(res, 500, error.message, null);
    }
}

export const deleteUserById = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const userToDelete = req.userId;

        if (!mongoose.Types.ObjectId.isValid(userToDelete!)) {
            return responseWarn(res, 404, 'Invalid User ID to delete!', null);
        }

        const userToBeDeleted = await User.findById(userToDelete);
        
        if (!userToBeDeleted) {
            return responseWarn(res, 404, 'User not found', null);
        }

        if (userToDelete === req.userId) {
            await User.deleteOne({ _id: userToDelete });
            const deletedPosts = await Post.deleteMany({ author: userToDelete });

            console.log(`'${userToDelete}' Account and '${deletedPosts.deletedCount}' Posts Deleted Successfully`);
            return responseInfo(res, 200, `Your Account and ${deletedPosts.deletedCount} posts Deleted Successfully`, null);
        }
    } catch (error: any) {
        console.log(error)
        return responseError(res, 500, error.message, null);
    }
};

export const followOrUnfollowUserById = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const followingId = req.userId!;
        const followerId = new mongoose.Types.ObjectId(req.params.userId);

        if (!mongoose.Types.ObjectId.isValid(followerId)) {
            return responseWarn(res, 404, 'Invalid User to follow Id!', null);
        }

        // ? Check if the user to follow exists
        const gettingFollowedUser = await User.findById(followerId);
        const followingUser = await User.findById(followingId);

        if (!gettingFollowedUser) {
            return responseWarn(res, 404, 'User to follow not found', null);
        }
        if (!followingUser) {
            return responseWarn(res, 404, 'User Who is Following not found', null);
        }

        // ? Check if the user is already being followed
        const isFollowing = gettingFollowedUser.followers.includes(followingId);

        if (isFollowing) {
            // ? If already following, unfollow
            gettingFollowedUser.followers = gettingFollowedUser.followers.filter((follower) => !follower.equals(followingId));
            await gettingFollowedUser?.save()
            followingUser.following = followingUser.following.filter((following) => !following.equals(followerId));
            await followingUser?.save();

            return responseInfo(res, 200, `${followingUser?.username} unfollowed ${gettingFollowedUser.username} Successfully.`, { following: false });
        } else {
            // ? If not following, follow
            gettingFollowedUser.followers.push(followingId);
            await gettingFollowedUser?.save()
            followingUser?.following.push(followerId);
            await followingUser?.save();

            return responseInfo(res, 200, `${followingUser?.username} followed ${gettingFollowedUser.username} Successfully.`, { following: true });
        }
    } catch (error: any) {
        console.log(error)
        return responseError(res, 500, error.message, null);
    }
};




