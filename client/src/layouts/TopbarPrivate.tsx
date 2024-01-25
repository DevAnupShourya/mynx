import { Button } from "@nextui-org/react";
import { Link } from "react-router-dom";

import ProfileDropDown from "~/components/profile/ProfileDropDown";
import Logo from "~/components/logo/Logo";

import { IoNotificationsOutline } from "react-icons/io5";

export default function NavbarPrivate() {
  return (
    <aside className="flex flex-row items-center justify-between px-24 max-md:px-10 max-sm:px-4 py-2">
      <Logo />
      <div className="flex flex-row justify-between items-center gap-4">
        <div className="flex flex-row justify-center items-center gap-2">
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
        </div>
        <ProfileDropDown />
      </div>
    </aside>
  );
}
