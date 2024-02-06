import { Tooltip, Link } from "@nextui-org/react";
import { useLocation, Link as RouterLink } from "react-router-dom";

import { IconType } from "react-icons";

interface nav_item {
  icon: IconType;
  name: string;
  url: string;
}

export default function NavLink({ icon, name, url }: nav_item) {
  const Icon = icon;
  const location = useLocation();

  return (
    <Tooltip content={name} className="">
      <Link
        as={RouterLink}
        to={url}
        className={`flex justify-center items-center p-2 transition-colors rounded-md tracking-widest outline-none border-none text-xl  ${
          location.pathname === url ? "bg-gray-200 shadow-2xl text-light-default dark:bg-zinc-800 dark:text-gray-200 scale-110" : "text-light-main dark:text-dark-main"
        }`}
        title={name}
      >
        <Icon />
      </Link>
    </Tooltip>
  );
}
