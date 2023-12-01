import axios from 'axios';
const API_URL = import.meta.env.VITE_API_URL as string;

import { FormDataInterface } from "~/types/types.barrel";
import uploadFile from '~/services/Cloudinary/CloudinaryUpload';

const createUser = async (formData: FormDataInterface) => {
    try {
        // ? Save User Images to Cloudinary DB
        const avatarCloudURL = await uploadFile(formData.avatarURL);
        const coverCloudURL = await uploadFile(formData.coverURL);

        // ? Save User Data to Local DB
        const response = await axios.post(`${API_URL}/users/signup`, {
            username: formData.username,
            password: formData.password,
            bio: formData.bio,
            avatarURL: avatarCloudURL,
            coverURL: coverCloudURL,
            name: formData.name,
            country: formData.country,
            gender: formData.gender,
            email: formData.email,
        })

        return response;
    } catch (error) {
        console.error("Error occurred While crating user account", error);
    }
}

const authenticateUser = async (formData: { email: string; password: string; }) => {
    try {
        const res = await axios.post(`${API_URL}/users/login`, { email: formData.email, password: formData.password })
        return res;
    } catch (error) {
        console.error("Error occurred While crating user account", error);
    }
}

const checkUsernameAvailability = async (username: string) => {
    // ? Check if username is valid string
    const usernameRegex = /^(?![0-9])[^a-zA-Z0-9]*(?!(?:chats|followers|new|notifications|settings|trending)$)[a-zA-Z][a-zA-Z0-9]*$/;
    const isValidUsername = usernameRegex.test(username);

    if (isValidUsername) {
        const response = await axios.get(`${API_URL}/users/usernames?username=${username}`);

        if (response.data.responseData.canUseQuery === 200) {
            return 200; // * OK
        } else if (response.data.responseData.canUseQuery === 406) {
            return 403; // * Already Used
        }
    } else {
        return 400; // * Invalid
    }
}

const getUserByUID = async (uId: string) => {
    try {
        const userData = await axios.get(`${API_URL}/api/users?userid=${uId}`)
        return userData.data.responseData;
    } catch (error) {
        console.error("Error occurred While getting user info", error);
    }
}

const getCurrentUser = async (token: string) => {
    try {
        const { data } = await axios.get(`${API_URL}/users/current`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return data.responseData.userInfo;
    } catch (error) {
        console.error("Error occurred While getting user info", error);
    }
}

export {
    createUser, checkUsernameAvailability, getUserByUID, getCurrentUser, authenticateUser
};