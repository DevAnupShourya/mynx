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