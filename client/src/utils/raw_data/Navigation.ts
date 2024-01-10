import { BiHomeSmile } from 'react-icons/bi';
import { FaRegUser } from 'react-icons/fa6';
import { RiCustomerService2Line } from 'react-icons/ri';
import { BsMailbox  } from 'react-icons/bs';
export const NavbarLinks = [
    {
        name: "Home",
        href: "/",
        icon : BiHomeSmile,
    },
    {
        name: "About",
        href: "/about",
        icon : FaRegUser,
    },
    {
        name: "Contact",
        href: "/contact",
        icon : RiCustomerService2Line,
    },
    {
        name: "Blogs",
        href: "/blogs",
        icon : BsMailbox,
    }
];

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

export const FooterCols = {
    CompanyItems: [
        {
            name: "About",
            href: "/about"
        },
        {
            name: "Careers",
            href: "/careers"
        },
        {
            name: "Brand Center",
            href: "/brand_center"
        },
        {
            name: "Blog",
            href: "/blog"
        }
    ],
    Help_center: [
        {
            name: "Discord Server",
            href: "https://discord.com/mynx"
        },
        {
            name: "Twitter",
            href: "https://Twitter.com/mynx"
        },
        {
            name: "Facebook",
            href: "https://Facebook.com/mynx"
        },
        {
            name: "Contact Us",
            href: "/contact"
        },
    ],
    Legal: [
        {
            name: "Privacy Policy",
            href: "/policy"
        },
        {
            name: "Licensing",
            href: "/license"
        },
        {
            name: "Terms & Conditions",
            href: "/terms"
        }
    ],
    Download: [
        {
            name: "iOS",
            href: "https://apple.com/store/mynx.app"
        },
        {
            name: "Android",
            href: "https://playstore.com/mynx.app"
        },
        {
            name: "Windows",
            href: "https://microsoft.com/mynx.app"
        },
        {
            name: "MacOS",
            href: "https://macos.com/mynx.app"
        },
    ]
};