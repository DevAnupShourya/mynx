import express from 'express';
const postsRoute = express.Router();

// ? Controllers
import {
    createPost,
    getAllPosts,
    getPostByPostId,
    updatePostByPostId,
    deletePostByPostId,
    getAllPostsOfCurrentUser,
    getAllPostsByUsername,
    updatePollPostByPostId,
    likePostById
} from '~/v1/controllers/PostController';
// ? Middleware
import userVerification from '~/v1/middleware/userVerification';

// * Root Route : .../v1/posts/*
postsRoute.post('/', userVerification, createPost);
postsRoute.patch('/:postId', userVerification, updatePostByPostId);
postsRoute.patch('/poll/:postId', userVerification, updatePollPostByPostId);
postsRoute.delete('/:postId', userVerification, deletePostByPostId);
postsRoute.get('/', userVerification, getAllPosts);
postsRoute.get('/p/:postId', userVerification, getPostByPostId);
postsRoute.get('/self', userVerification, getAllPostsOfCurrentUser);
postsRoute.get('/username', userVerification, getAllPostsByUsername);
postsRoute.patch('/like/:postId', userVerification, likePostById); 

export default postsRoute;