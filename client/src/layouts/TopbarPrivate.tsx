import { Button, Badge } from "@nextui-org/react";

import { IoNotificationsOutline } from "react-icons/io5";

import { Link } from "react-router-dom";

import { ProfileDropDown, Logo } from "~/components/components.barrel";

export default function NavbarPrivate() {
  return (
    <aside className="flex flex-row items-center justify-between px-24 max-md:px-10 max-sm:px-4 py-2">
      <Logo />
      <div className="flex flex-row justify-between items-center gap-4">
        <div className="f-row gap-2">
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
    </aside>
  );
}
