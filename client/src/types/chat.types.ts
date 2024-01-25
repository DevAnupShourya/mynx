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

export interface ChatMetadataInterface {
    isCurrentUserOnline: boolean,
    isCurrentUserTyping: boolean,
    isChattingWithUserOnline: boolean,
    isChattingWithUserTyping: boolean,
}

