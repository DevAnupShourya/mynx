import { BiHomeSmile } from 'react-icons/bi';
import { FaRegUser } from 'react-icons/fa6';
import { RiCustomerService2Line } from 'react-icons/ri';
import { BsMailbox , BsChatSquareDots } from 'react-icons/bs';
import { ImFeed } from 'react-icons/im';
import { HiOutlineFire } from 'react-icons/hi';
import { TbUserStar } from 'react-icons/tb';

export const MenuLinks = [
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

export const AuthMenuLinks = [
    {
        name: "Circle",
        href: "/",
        icon: ImFeed,
    },
    {
        name: "Trending",
        href: "/trending",
        icon: HiOutlineFire,
    },
    {
        name: "Follower",
        href: "/follower",
        icon: TbUserStar,
    },
    {
        name: "Chats",
        href: "/chats",
        icon: BsChatSquareDots,
    }
];

export const FooterItems = {
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
            href: "https://discord.com/"
        },
        {
            name: "Twitter",
            href: "https://Twitter.com/"
        },
        {
            name: "Facebook",
            href: "https://Facebook.com/"
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
            href: "https://apple.com/store/"
        },
        {
            name: "Android",
            href: "https://playstore.com/"
        },
        {
            name: "Windows",
            href: "https://microsoft.com/"
        },
        {
            name: "MacOS",
            href: "https://macos.com/"
        },
    ]
};