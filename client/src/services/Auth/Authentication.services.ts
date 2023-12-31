import axiosInstance from "~/lib/AxiosInstance";

import { FormDataInterface } from "~/types/types.barrel";
import uploadFile from '~/services/Cloudinary/CloudinaryUpload';

const createUser = async (formData: FormDataInterface) => {
    let coverCloudURL;
    let avatarCloudURL;
    
    // ? Save User Images to Cloudinary DB if Needed
    if (!(formData.coverURL === '')) {
        coverCloudURL = await uploadFile(formData.coverURL);
    }
    if (!(formData.avatarURL === '')) {
        avatarCloudURL = await uploadFile(formData.avatarURL);
    }

    // ? Save User Data to Local DB
    const response = await axiosInstance.post(`/users/signup`, {
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
}

const authenticateUser = async (formData: { email: string; password: string; }) => {
    const res = await axiosInstance.post(`/users/login`, { email: formData.email, password: formData.password })
    return res;
}

const checkUsernameAvailability = async (username: string) => {
    // ? Check if username is valid string
    const usernameRegex = /^(?![0-9])[^a-zA-Z0-9]*(?!(?:chats|followers|new|notifications|settings|trending)$)[a-zA-Z_][a-zA-Z0-9_]*$/

    const isValidUsername = usernameRegex.test(username);

    if (isValidUsername) {
        const response = await axiosInstance.get(`/users/username-status?username=${username}`);

        if (response.data.responseData.canUseQuery) {
            return 200; // * OK
        } else {
            return 403; // * Already Used
        }
    } else {
        return 400; // * Invalid
    }
}

const getUserByUID = async (uId: string) => {
    const userData = await axiosInstance.get(`/users/u/${uId}`)
    return userData.data.responseData;
}

const getCurrentUser = async (token: string) => {
    const { data } = await axiosInstance.get(`/users/info`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return data.responseData.userInfo;
}

export {
    createUser, checkUsernameAvailability, getUserByUID, getCurrentUser, authenticateUser
};