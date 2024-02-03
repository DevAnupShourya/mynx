export interface ChatDataInterface {
    chatId: string,
    started: string,
    lastChanged: string,
}

export interface ChattingWithUserDataInterface {
    image: string,
    name: string,
    username: string,
}

export interface MessageFormInterface {
    text: string,
    files: {
        url: string,
        name: string,
    }[],
}

export interface MessageInterface {
    id: string;
    created: Date;
    updated: Date;
    files: string[];
    senderId: string;
    text: string;
}
export interface MessagesListResponseInterface {
    chatId: string;
    createdAt: Date;
    files: string[];
    sender: string;
    text: string;
    updatedAt: Date;
    _id: string;
}

export type PersonalChatDataListType = {
    chatId: string;
    lastChattedDate: Date;
    lasMessageId: string;
    chattingWithUserId: string;
}[]
export type GroupChatDataListType = {
    chatId: string;
    lasMessageId: string;
    groupName: string;
    groupImage: string;
    lastChattedDate: Date;
    members?: string[];
}[]

export type GroupFormType = {
    groupImage: string;
    groupDescription: string;
    groupName: string;
}
