import { HiOutlineChatBubbleLeftEllipsis } from "react-icons/hi2";
import { MdOutlineDynamicFeed } from "react-icons/md";
import { HiOutlineFire } from 'react-icons/hi';
import { TbUserStar } from 'react-icons/tb';

export const PrivateNavbarLinks = [
    {
        name: "Feed",
        href: "/",
        icon: MdOutlineDynamicFeed,
    },
    {
        name: "Trending",
        href: "/trending",
        icon: HiOutlineFire,
    },
    {
        name: "Follower",
        href: "/friends",
        icon: TbUserStar,
    },
    {
        name: "Chats",
        href: "/chats",
        icon: HiOutlineChatBubbleLeftEllipsis ,
    }
];