# API Documentation

## Introduction

Welcome to the MYNX API documentation. This document provides comprehensive information on how to integrate and use our API.

## Getting Started

### Endpoint URL

- Base URL: `http://localhost:3300/`

### Authentication

To access the API, you need to include your API key in the request header:

`Authorization: Bearer YOUR_API_KEY`

## Request Format

All API requests should be made using HTTPS. The following HTTP methods are supported:

- `GET`: Retrieve data
- `POST`: Create new data
- `PATCH`: Update existing data
- `DELETE`: Remove data

## Response Format

API responses are returned in JSON format.

### Success Response

```json
{
    "status": "Success",
    "message": "My Custom Success Message",
    "responseData": data || null
}
```

### Error Response

```json
{
    "status": "Error",
    "message": "My Custom Error Message",
    "data": data || null
}
```

### Warning Response

```json
{
    "status": "Warning",
    "message":  "My Custom Warning Message",
    "responseData": data || null
}
```

## Endpoints

### 1. `/users`

#### `POST /users/signup` [No Authorization Needed]

- **Description**: Create a new user.
- **Method**: POST
- **Body**:
  - `name` (string, required): The name of the new user.
  - `username` (string, required, unique): The username of the new user.
  - `email` (string, required, unique): The email address of the new user.
  - `password` (string, required): The password of the new user.
  - `bio` (string, required): The Bio of the new user.
  - `avatarURL` (string, required): The Avatar Image URL of the new user.
  - `coverURL` (string, required): The Cover Image URL of the new user.
  - `country` (string, required): The Country of the new user.
  - `gender` (string, required): The gender of the new user.

#### `POST /users/login` [No Authorization Needed]

- **Description**: Authenticate a user.
- **Method**: POST
- **Body**:
  - `email` (string, required, unique): The email address of the new user.
  - `password` (string, required): The password of the new user.

#### `GET /users`

- **Description**: Retrieve a list of all users.
- **Method**: GET
- **Query Parameters**:
  - `page` (number): Page Number.
  - `limit` (number): Users Per Page.

#### `GET /users/u/:user_id`

- **Description**: Retrieve details of a specific user by Id.
- **Method**: GET
- **URL Parameters**:
  - `user_id` (string, required): The unique identifier of the user.

#### `PATCH /users/:user_id`

- **Description**: Update details of a specific user.
- **Method**: PATCH
- **Body**:
  - `name` (string, optional): The name of the new user.
  - `username` (string, optional, unique): The username of the new user.
  - `email` (string, optional, unique): The email address of the new user.
  - `password` (string, optional): The password of the new user.
  - `bio` (string, optional): The Bio of the new user.
  - `avatarURL` (string, optional): The Avatar Image URL of the new user.
  - `coverURL` (string, optional): The Cover Image URL of the new user.
  - `country` (string, optional): The Country of the new user.
  - `gender` (string, optional): The gender of the new user.


#### `DELETE /users/:user_id`

- **Description**: Delete a specific user if User is Authorized.
- **Method**: DELETE


#### `GET /users/username-status`

- **Description**: Check if a certain username is available to use.
- **Method**: GET
- **Return Value**: boolean
- **Parameters**:
  - `username` (string, required): The username to check availability.
- **Example Request**:
  ```http
  GET /api/users/username-status?username=myusername
  ```


#### `GET /users/username`

- **Description**: Search for a user by username.
- **Method**: GET
- **Parameters**:
  - `username` (string, required): The username to search for.
- **Example Request**:
  ```http
  GET /users/username?username=myusername
  ```

#### `POST /users/follow/:toBeFollowedUserId`

- **Description**: Follow or unfollow user.
- **Method**: GET
- **URL Parameters**:
  - `userId` (string, required): The userId to follow or unfollow.
- **Example Request**:
  ```http
  GET /users/follow/:649fe3a4945564b46980ce9b
  ```

### 2. `/posts`

#### `GET /posts`

- **Description**: Retrieve a list of all posts.
- **Method**: GET
- **Query Parameters**:
  - `page` (number): Page Number.
  - `limit` (number): Posts Per Page.

#### `GET /posts/:post_id`

- **Description**: Retrieve details of a specific post.
- **Method**: GET
- **URL Parameters**:
  - `post_id` (string, required): The unique identifier of the post.

#### `POST /posts`

- **Description**: Create a new post.
- **Method**: POST
- **Body**:
  - `postType` (string, required): The type of Post eg. 'Vixet', 'Vixdeo', 'Vixsnap', 'Vixogs', 'Vixpoll', 'Vixlive'.
  - `tags` (Array, required): Array of tags for post, At Lest 1 Tag.
  - `title` (string, optional): The Title of post.
  - `description` (string, optional): The Description of post if available.
  - `videoURL` (Array, optional): The URL of Videos of post if available.
  - `imagesURL` (Array, optional): The URL of Images of post if available.
  - `pollOptions` (Object, optional): The Object of Arrays of Questions.

#### `PATCH /posts/:post_id`

- **Description**: Update details of a specific post.
- **Method**: PATCH
- **Parameters**:
  - `postType` (string, required): The type of Post eg. 'Vixet', 'Vixdeo', 'Vixsnap', 'Vixogs', 'Vixpoll', 'Vixlive'.
  - `tags` (Array, required): Array of tags for post, At Lest 1 Tag.
  - `title` (string, optional): The Title of post.
  - `description` (string, optional): The Description of post if available.
  - `videoURL` (Array, optional): The URL of Videos of post if available.
  - `imagesURL` (Array, optional): The URL of Images of post if available.
  - `pollOptions` (Object, optional): The Object of Arrays of Questions.

#### `DELETE /posts/:post_id`

- **Description**: Delete a specific post.
- **Method**: DELETE
- **Parameters**:
  - `post_id` (string, required): The unique identifier of the post.

#### `POST /posts/like/:postId`

- **Description**: Like or unlike post.
- **Method**: POST
- **Parameters**:
  - `post_id` (string, required): The unique identifier of the post.

#### `GET /posts/self`

- **Description**: Get all posts of Current User.
- **Method**: GET

#### `GET /posts/username/:username`

- **Description**: Get all posts by username.
- **Method**: GET
- **Parameters**:
  - `username` (string, required): The unique Username string.
