import { axiosInstanceAuth } from "~/lib/AxiosInstance";

import { GroupFormType } from "~/types/chat.types";
import uploadFile from '~/services/UploadFiles/CloudinaryUpload';

export const getPersonalChat = async (userId: string) => {
    const { data } = await axiosInstanceAuth.get(`/chats/p/${userId}`);
    return data.responseData;
}

export const getPersonalChatsList = async () => {
    const { data } = await axiosInstanceAuth.get(`/chats/p`);
    return data.responseData;
}

export const getGroupChatsList = async () => {
    const { data } = await axiosInstanceAuth.get(`/chats/g`);
    return data.responseData;
}

export const createGroupChat = async (groupFormData: GroupFormType, membersId: string[]) => {
    const groupImageUrl = groupFormData.groupImage ? await uploadFile(groupFormData.groupImage) : '';
    const { data } = await axiosInstanceAuth.post(`/chats/g`,
        {
            participants: membersId,
            groupDescription: groupFormData.groupDescription.trim().toLowerCase(),
            groupName: groupFormData.groupName.trim().toUpperCase(),
            groupImage: groupImageUrl
        });
    return data.responseData;
}

export const getGroupChat = async (chatId: string) => {
    const { data } = await axiosInstanceAuth.get(`/chats/g/${chatId}`);
    return data.responseData;
}

export const createMessage = async (formData: string, chatId: string) => {
    const messagePayload = {
        text: formData,
        chatId: chatId
    }
    const { data } = await axiosInstanceAuth.post(`/chats/m`, messagePayload);
    return data.responseData;
}

export const getMessageById = async (messageId: string) => {
    const { data } = await axiosInstanceAuth.get(`/chats/m/${messageId}`);
    return data.responseData;
}

export const getAllMessages = async (chatId: string) => {
    const { data } = await axiosInstanceAuth.get(`/chats/all/m/${chatId.trim()}`);
    return data.responseData;
}
export const getAllMessageIds = async (chatId: string) => {
    const { data } = await axiosInstanceAuth.get(`/chats/all/id/${chatId.trim()}`);
    return data.responseData;
}

export const removeUserByAdmin = async (groupId: string, userId: string) => {
    const { data } = await axiosInstanceAuth.delete(`/chats/g/admin/${groupId}/removeUser/${userId}`);
    return data;
}