import { axiosInstance, axiosInstanceAuth } from "~/lib/AxiosInstance";

import uploadFile from '~/services/UploadFiles/CloudinaryUpload';
import { FormDataInterface, UpdateUserProfileInterface } from "~/types/user.types";

export const createUser = async (formData: FormDataInterface) => {
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
    return await axiosInstance.post(`/users/signup`, {
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
}

export const authenticateUser = async (formData: { email: string; password: string; }) => {
    return await axiosInstance.post(`/users/login`, { email: formData.email, password: formData.password })
}

export const checkUsernameAvailability = async (username: string) => {
    // ? Check if username is valid string
    const usernameRegex = /^(?![0-9])[^a-zA-Z0-9]*(?!(?:chats|friends|new|notifications|settings|trending)$)[a-zA-Z_][a-zA-Z0-9_]*$/

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

export const getUserByUID = async (uId: string) => {
    const { data } = await axiosInstanceAuth.get(`/users/u/${uId}`)
    return data.responseData;

}

export const getCurrentUser = async () => {
    const { data } = await axiosInstanceAuth.get(`/users/info`);
    return data.responseData.userInfo;
}

export const getUserByUsername = async (username: string) => {
    const { data } = await axiosInstanceAuth.get(`/users/username?username=${username}`);
    return data;
}

export const followUserById = async (followingID: string) => {
    const { data } = await axiosInstanceAuth.put(`/users/follow/${followingID}`);
    return data;
}

export const updateUserDataService = async (userData: UpdateUserProfileInterface) => {
    const { data } = await axiosInstanceAuth.patch(`/users`, userData);
    return data;
};

export const deleteUser = async () => {
    const response = await axiosInstanceAuth.delete(`/users`);
    return response;
};

export const getAllPostsByUsername = async (username: string, pageNum: number) => {
    const response = await axiosInstanceAuth.get(`/posts/username?username=${username}&page=${pageNum}`);
    return response;
}


