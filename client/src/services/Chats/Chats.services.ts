import axiosInstance from "~/lib/AxiosInstance";
import { GroupFormType } from "~/types/chat.types";
import uploadFile from '~/services/UploadFiles/CloudinaryUpload';

export const getPersonalChat = async (userId: string, token: string) => {
    const { data } = await axiosInstance.get(`/chats/p/${userId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });
    return data.responseData;
}

export const getPersonalChatsList = async (token: string) => {
    const { data } = await axiosInstance.get(`/chats/p`, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });
    return data.responseData;
}

export const getGroupChatsList = async (token: string) => {
    const { data } = await axiosInstance.get(`/chats/g`, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });
    return data.responseData;
}

export const createGroupChat = async (groupFormData: GroupFormType, membersId: string[], token: string) => {
    const groupImageUrl = groupFormData.groupImage ? await uploadFile(groupFormData.groupImage) : '';
    
    const { data } = await axiosInstance.post(`/chats/g`,
        {
            participants: membersId,
            groupDescription: groupFormData.groupDescription.trim().toLowerCase(),
            groupName: groupFormData.groupName.trim().toUpperCase(),
            groupImage: groupImageUrl
        },
        {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
    return data.responseData;
}

export const getGroupChat = async (chatId: string, token: string) => {
    const { data } = await axiosInstance.get(`/chats/g/${chatId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });
    return data.responseData;
}

export const createMessage = async (formData: string, chatId: string, token: string) => {
    const messagePayload = {
        text: formData,
        chatId: chatId
    }
    const { data } = await axiosInstance.post(`/chats/m`,
        messagePayload,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });

    return data.responseData;
}

export const getMessageById = async (messageId: string, token: string) => {
    const { data } = await axiosInstance.get(`/chats/m/${messageId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });
    return data.responseData;
}

export const getAllMessages = async (chatId: string, token: string) => {
    const { data } = await axiosInstance.get(`/chats/all/m/${chatId.trim()}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });
    return data.responseData;
}
export const getAllMessageIds = async (chatId: string, token: string) => {
    const { data } = await axiosInstance.get(`/chats/all/id/${chatId.trim()}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });
    return data.responseData;
}

export const removeUserByAdmin = async (groupId: string, userId: string, token: string) => {
    const { data } = await axiosInstance.delete(`/chats/g/admin/${groupId}/removeUser/${userId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });
    return data;
}