import { Link as LinkButton , Tooltip } from "@nextui-org/react";

import { IconType } from "react-icons";
import { useLocation, Link } from "react-router-dom";

interface nav_item {
  icon: IconType;
  name: string;
  url: string;
}

export default function NavLink({ icon, name, url }: nav_item) {
  const path = useLocation().pathname;
  const Icon = icon;
  
  return (
    <Tooltip content={name} className="bg-all shadow-2xl">
      <LinkButton
        to={url}
        as={Link}
        className={`grid place-items-center p-2 transition-colors rounded-md tracking-widest dark:hover:bg-dark-default hover:bg-light-default ${
          (path === url ? true : false)
            ? "bg-light-default dark:bg-dark-default shadow-2xl"
            : null
        }`}
        title={name}
      >
        <h1
          className={`dark:text-dark-default text-light-default ${
            (path === url ? true : false)
              ? "dark:text-dark-main text-light-main"
              : null
          }`}
        >
          <Icon />
        </h1>
      </LinkButton>
    </Tooltip>
  );
}
