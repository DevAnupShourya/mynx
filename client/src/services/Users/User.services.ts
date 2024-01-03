import axiosInstance from "~/lib/AxiosInstance";
import { UpdateUserProfileInterface } from "~/types/types.barrel";

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
    console.table(userData)
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



