import axiosInstance from "~/lib/AxiosInstance";

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

export const getUserByUID = async (uId: string, token: string) => {
        const { data } = await axiosInstance.get(`/users/u/${uId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        return data.responseData;

}

export const getCurrentUser = async (token: string) => {
        const { data } = await axiosInstance.get(`/users/info`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return data.responseData.userInfo;
}

export const getUserByUsername = async (username: string, token: string) => {
        const { data } = await axiosInstance.get(
            `/users/username?username=${username}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return data;
}

export const followUserById = async (followingID: string, token: string) => {

        const { data } = await axiosInstance.put(
            `/users/follow/${followingID}`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
        return data;
}

export const updateUserDataService = async (token: string, userData: UpdateUserProfileInterface) => {

        const { data } = await axiosInstance.patch(
            `/users`,
            userData,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
        return data;

};

export const deleteUser = async (token: string) => {

        const response = await axiosInstance.delete(`/users`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response;

};

export const getAllPostsByUsername = async (username: string, token: string, pageNum: number) => {

        const response = await axiosInstance.get(
            `/posts/username?username=${username}&page=${pageNum}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return response;
}


