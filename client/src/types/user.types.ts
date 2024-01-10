export interface FormDataInterface {
    username: string,
    bio: string,
    avatarURL: string,
    coverURL: string,
    name: string,
    country: string,
    gender: string,
    password: string,
    email: string,
}

export interface UpdateUserProfileInterface {
    username: string,
    bio: string,
    avatarURL: string,
    coverURL: string,
    name: string,
    password: string,
    email: string
}

export interface OnePostAuthorResponseType {
    name: string;
    email: string;
    username: string;
    avatarUrl: string;
}
