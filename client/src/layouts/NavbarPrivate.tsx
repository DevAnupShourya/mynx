import { Button, Badge } from "@nextui-org/react";

import { IoNotificationsOutline } from "react-icons/io5";
import { BsFillPatchPlusFill } from "react-icons/bs";

import { Link } from "react-router-dom";

import { AuthMenuLinks } from "~/utils/data/data.barrel";
// import ThemeSwitch from "@src/components/buttons/ThemeSwitch";
import { ProfileDropDown, NavLink, Logo } from "~/components/components.barrel";

export default function NavbarPrivate() {
  return (
    <nav className="max-sm:w-full max-md:w-11/12 w-10/12 rounded-md shadow-2xl max-md:px-1 px-5 py-4 f-row bg-main-text-default justify-between">
      <div id="logo" className="h-full">
        <Logo type="sm" />
      </div>
      <div id="links" className="f-row h-full flex-row gap-5 max-md:hidden">
        {AuthMenuLinks.map((item) => {
          return (
            <NavLink
              key={item.name}
              icon={item.icon}
              name={item.name}
              url={item.href}
            />
          );
        })}
      </div>
      <div id="menu" className="f-row gap-4 h-full">
        {/* <ThemeSwitcher /> */}
        ThemeSwitcher
        <div className="f-row gap-2">
          <Button
            isIconOnly
            variant="shadow"
            color="secondary"
            as={Link}
            to="/new"
            size="sm"
            className="max-md:hidden"
          >
            <BsFillPatchPlusFill />
          </Button>
          <Badge content="90" shape="circle" color="secondary" size="sm">
            <Button
              radius="full"
              isIconOnly
              aria-label="more than 99 notifications"
              variant="ghost"
              as={Link}
              to="/notifications"
              color="secondary"
            >
              <IoNotificationsOutline />
            </Button>
          </Badge>
        </div>
        <ProfileDropDown />
      </div>
    </nav>
  );
}