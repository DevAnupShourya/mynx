import type { IconType } from "react-icons";

export interface alertInterface {
    show: boolean,
    type: "success" | "danger" | "warning" | null,
    msg: string | null,
}

export interface userDataInterface {
    name: string,
    username: string,
    joining: string,
    coverImgSrc: string,
    avatarImgSrc: string,
}

export interface NavLinksInterface {
    name: string,
    href: string,
    icon: IconType,
}

export interface userDataInterface {
    name: string,
    mail: string,
    username: string,
    dateJoined: string,
    userImg: string,
}

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


export interface PostDataInterface {
    postType: 'Vixet' | 'Vixdeo' | 'Vixsnap' | 'Vixogs' | 'Vixpoll' | 'Vixlive',
    tags: string[],
    title?: string,
    description?: string,
    videos?: string[]
    videosDisplay?: string[]
    images?: string[]
    imagesDisplay?: string[]
    pollOptions?: { pollName: string }[] | null,
}
