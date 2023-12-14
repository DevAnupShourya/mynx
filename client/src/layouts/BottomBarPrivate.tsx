import React from "react";

import { AuthMenuLinks } from "~/utils/data/data.barrel";
import { NavLink } from "~/components/components.barrel";

import { BsFillPatchPlusFill } from "react-icons/bs";

import { Link } from "react-router-dom";

import { Button } from "@nextui-org/react";

function BottomBarPrivate() {
  const middlePlace = AuthMenuLinks.length / 2;

  return (
    <nav className="px-24 py-2 max-md:px-10 max-sm:px-4">
      <div
        id="Navigation Links"
        className="w-full h-full flex flex-row justify-around items-center"
      >
        {AuthMenuLinks.map((item, index) => {
          if (index === middlePlace) {
            return (
              <React.Fragment key={index}>
                <Button
                  isIconOnly
                  radius="full"
                  variant="shadow"
                  color="secondary"
                  as={Link}
                  to="/new"
                  size="sm"
                >
                  <BsFillPatchPlusFill />
                </Button>
                <NavLink
                  key={item.name}
                  icon={item.icon}
                  name={item.name}
                  url={item.href}
                />
              </React.Fragment>
            );
          } else {
            return (
              <NavLink
                key={item.name}
                icon={item.icon}
                name={item.name}
                url={item.href}
              />
            );
          }
        })}
      </div>
    </nav>
  );
}

export default BottomBarPrivate;
