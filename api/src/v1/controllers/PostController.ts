import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { postCreateSchema } from '~/v1/types/Joi.schemas';

import { responseError, responseInfo, responseWarn } from '~/v1/utils/apiResponseMsg';
import Post from '~/v1/models/Post.model';
import User from '~/v1/models/User.model';

interface AuthenticatedRequest extends Request {
    userId?: mongoose.Types.ObjectId;
}

// ? Creating a Post
export const createPost = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const author = req.userId
        const postData = req.body;

        // ? Validating the user object against the schema
        const postDataFiltered = await postCreateSchema.validateAsync(postData);

        const savedPost = await Post.create({ ...postDataFiltered, author });

        await User.findByIdAndUpdate(author, { $push: { posts: savedPost._id } });
        responseInfo(res, 202, "Post Created Successfully!", savedPost);

    } catch (error: any) {
        responseError(res, 500, error.message, null);
    }
};

// ? Getting All Posts Available
export const getAllPosts = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;

        const totalPosts = await Post.estimatedDocumentCount();
        const totalPages = Math.ceil(totalPosts / limit);

        const hasNextPage = page < totalPages;
        const hasPrevPage = page > 1;
        const nextPage = hasNextPage ? page + 1 : null;

        const allPosts = await Post.find({})
            .skip((page - 1) * limit)
            .limit(limit)
            .sort({ createdAt: -1 }); // * Sorting by createdAt in descending order (newer posts comes first)

        responseInfo(res, 200, "All Available Posts!", {
            hasNextPage,
            hasPrevPage,
            nextPage,
            limit,
            currentPage: page,
            totalPages,
            allPosts,
        });
    } catch (error: any) {
        responseError(res, 500, error.message, null);

    }
};

// ? Getting a Post by postId
export const getPostByPostId = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const postId = req.params.postId as string;

        // ? Checking if postId is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(postId)) {
            return responseWarn(res, 400, "Invalid PostId", null);
        }

        const post = await Post.findById(postId);

        if (!post) {
            return responseWarn(res, 404, "No Post Available", null);
        }

        return responseInfo(res, 200, "Post Retrieved Successfully", post);
    } catch (error: any) {
        responseError(res, 500, error.message, null);

    }
};

// ? Getting all Posts of Use by UserId
export const getAllPostsOfCurrentUser = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const userIdOfPosts = req.userId;
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;

        const totalPosts = await Post.estimatedDocumentCount();
        const totalPages = Math.ceil(totalPosts / limit);

        const hasNextPage = page < totalPages;
        const hasPrevPage = page > 1;
        const nextPage = hasNextPage ? page + 1 : null;

        const allPostsOfUser = await Post.find({ author: userIdOfPosts })
            .skip((page - 1) * limit)
            .limit(limit)
            .sort({ createdAt: -1 });

        if (allPostsOfUser.length === 0) {
            return responseInfo(res, 200, "No Posts Available for the User", []);
        } else {
            return responseInfo(res, 200, "All Posts of the User", {
                hasNextPage,
                hasPrevPage,
                nextPage,
                limit,
                currentPage: page,
                allPostsOfUser,
            });
        }
    } catch (error: any) {
        responseError(res, 500, error.message, null);

    }
}

// ? Updating a Post by its PostId
export const updatePostByPostId = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const authorIdShouldBe = req.userId!;
        const postId = req.params.postId as string;
        const postDataToUpdate = req.body;

        // ? Check if postId is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(postId)) {
            return responseWarn(res, 400, "Invalid PostId", null);
        }

        const postToUpdate = await Post.findById(postId);

        if (!postToUpdate) {
            return responseWarn(res, 404, "No Post Available", null);
        }

        // ? Check if the requesting user is the author of the post
        if (!(postToUpdate.author.equals(authorIdShouldBe))) {
            return responseWarn(res, 403, "You are Unauthorized to do this action lol", null);
        }

        // ? Validating the user object against the schema
        const postDataToUpdateFiltered = await postCreateSchema.validateAsync(postDataToUpdate);

        const updatedPost = await Post.findByIdAndUpdate(postToUpdate.id, postDataToUpdateFiltered, { new: true });
        return responseInfo(res, 200, "Post Updated Successfully", updatedPost);

    } catch (error: any) {
        responseError(res, 500, error.message, null);

    }
};

// ? Getting all Posts of Given Username
export const getAllPostsByUsername = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const usernameToSearch = req.query.username;
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;

        // ? Find the user based on the username
        const user = await User.findOne({ username: usernameToSearch });

        if (!user) {
            return responseInfo(res, 404, `User not found: ${usernameToSearch}`, null);
        }

        // ? Find posts by the user's ObjectId
        const posts = await Post.find({ 'author': user._id })
            .skip((page - 1) * limit)
            .limit(limit)
            .sort({ createdAt: -1 });

        const totalPosts = await Post.countDocuments({ 'author': user._id });
        const totalPages = Math.ceil(totalPosts / limit);

        const hasNextPage = page < totalPages;
        const hasPrevPage = page > 1;
        const nextPage = hasNextPage ? page + 1 : null;

        if (posts.length === 0) {
            return responseInfo(res, 200, `No Posts Available for ${usernameToSearch}`, []);
        } else {
            return responseInfo(res, 200, `Posts for ${usernameToSearch}`, {
                hasNextPage,
                hasPrevPage,
                nextPage,
                limit,
                currentPage: page,
                posts,
            });
        }
    } catch (error: any) {
        responseError(res, 500, error.message, null);
    }
};


// ? Deleting a Post by it's Id
export const deletePostByPostId = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const authorIdShouldBe = req.userId!;
        const postId = req.params.postId as string;

        // ? Check if postId is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(postId)) {
            return responseWarn(res, 400, "Invalid PostId", null);
        }

        const postToUpdate = await Post.findById(postId);

        if (!postToUpdate) {
            return responseWarn(res, 404, "No Post Available", null);
        }

        // ? Check if the requesting user is the author of the post
        if (!(postToUpdate.author.equals(authorIdShouldBe))) {
            return responseWarn(res, 403, "You are Unauthorized to do this action", null);
        }

        const deletedPost = await Post.findByIdAndDelete(postId);
        return responseInfo(res, 200, "Post Deleted Successfully", deletedPost);

    } catch (error: any) {
        responseError(res, 500, error.message, null);

    }
}

export const likePostById = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const postId = req.params.postId;
        const userIdToLike = req.userId!;

        // ? Check if postId is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(postId)) {
            return responseWarn(res, 400, "Invalid PostId", null);
        }

        // ? Find the post by postId
        const post = await Post.findById(postId);

        // ? Check if the post exists
        if (!post) {
            return responseWarn(res, 404, `Post not found by id ${postId}`, null);
        }

        // ? Check if the user has already liked the post
        const userLiked = post.likes.includes(userIdToLike);
        if (userLiked) {
            post.likes = post.likes.filter((postLikedUserId) => !postLikedUserId.equals(userIdToLike));
            await post.save();
            const totalLikes = post.likes.length;
            return responseWarn(res, 200, "Post Unliked successfully", { totalLikes });
        }

        // ? Add the user's ID to the likes array
        post.likes.push(userIdToLike);
        // ? Save the updated post
        await post.save();
        const totalLikes = post.likes.length;

        return responseWarn(res, 200, "Post liked successfully", { totalLikes });
    } catch (error: any) {
        responseError(res, 500, error.message, null);

    }
}