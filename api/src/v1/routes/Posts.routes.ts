// ? Packages
import express from 'express';
const postsRoute = express.Router();

import {
    createPost,
    getAllPosts,
    getPostByPostId,
    updatePostByPostId,
    deletePostByPostId,
    getAllPostsOfCurrentUser,
    getAllPostsByUsername,
    likePostById
} from '~/v1/controllers/PostController';
// ? Middleware
import userVerification from '~/v1/middleware/userVerification';

// * Main Route : http://127.0.0.1:3300/api/posts/*

postsRoute.post('/', userVerification, createPost);
postsRoute.patch('/:postId', userVerification, updatePostByPostId);
postsRoute.delete('/:postId', userVerification, deletePostByPostId);
postsRoute.get('/', userVerification, getAllPosts);
postsRoute.get('/p/:postId', userVerification, getPostByPostId);
postsRoute.get('/self', userVerification, getAllPostsOfCurrentUser);
postsRoute.get('/username', userVerification, getAllPostsByUsername);
postsRoute.patch('/like/:postId', userVerification, likePostById); 

export default postsRoute;