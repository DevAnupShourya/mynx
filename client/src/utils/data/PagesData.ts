import { MdInsights, MdSpaceDashboard } from "react-icons/md";
import { MdSecurity } from "react-icons/md";
import { FaUsersRays } from "react-icons/fa6";

const About_Page_Data= [
    {
        name: "Intuitive User Dashboard",
        description:
            "Access a user-friendly dashboard where you can manage your tasks, projects, and settings effortlessly.",
        icon: MdSpaceDashboard,
    },
    {
        name: "Secure Data Encryption",
        description:
            "Rest assured knowing that your data is protected with industry-standard encryption algorithms, ensuring privacy and security.",
        icon: MdSecurity,
    },
    {
        name: "Effortless Collaboration",
        description:
            "Collaborate seamlessly with your team members. Share tasks, files, and ideas in real time to boost productivity.",
        icon: FaUsersRays,
    },
    {
        name: "Personalized Task Insights",
        description:
            "Gain valuable insights into your work habits and progress. Get personalized recommendations to enhance your productivity.",
        icon: MdInsights,
    },
];

export { About_Page_Data };