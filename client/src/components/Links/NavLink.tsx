import { Tooltip } from "@nextui-org/react";

import { IconType } from "react-icons";
import { NavLink as NavLinkBtn } from "react-router-dom";

interface nav_item {
  icon: IconType;
  name: string;
  url: string;
  withName?: boolean;
}

export default function NavLink({ icon, name, url, withName }: nav_item) {
  const Icon = icon;

  const isActiveLinkStyle =
    "grid place-items-center p-2 transition-colors rounded-md tracking-widest dark:hover:bg-dark-default hover:bg-light-default bg-light-default dark:bg-dark-default shadow-2xl outline-none border-none dark:text-dark-main text-light-main";
  const isNotActiveLinkStyle =
    "grid place-items-center p-2 transition-colors rounded-md tracking-widest dark:hover:bg-dark-default hover:bg-light-default outline-none border-none";

  return (
    <Tooltip content={name} className="bg-main-text-default">
      <NavLinkBtn
        to={url}
        className={({ isActive }) =>
          isActive ? isActiveLinkStyle : isNotActiveLinkStyle
        }
        title={name}
      >
        <Icon />
        {withName && name}
      </NavLinkBtn>
    </Tooltip>
  );
}
