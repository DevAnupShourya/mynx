import axiosInstance from "~/lib/AxiosInstance";

export const getPersonalChat = async (userId: string, token: string) => {
    const { data } = await axiosInstance.get(`/chats/p/${userId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });
    return data.responseData;
}

export const getPersonalChatsList = async (token: string) => {
    return await axiosInstance.get(`/chats/p`, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });
}

// ! data: string for now 
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
    return await axiosInstance.get(`/chats/m/${messageId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });
}

export const getAllMessages = async (chatId: string, token: string) => {
    const { data } = await axiosInstance.get(`/chats/all/m/${chatId.trim()}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });

    return data.responseData;
}