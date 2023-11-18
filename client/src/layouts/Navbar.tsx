import React from "react";
import { Link } from "react-router-dom";

import {
  Navbar as Nav,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Button,
} from "@nextui-org/react";

import Logo from "~/components/Logo/Logo";
import NavLink from "~/components/Links/NavLink";
// import ThemeSwitch from "@src/components/buttons/ThemeSwitch";
import { MenuLinks } from "~/utils/data/data.barrel";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <Nav
      className="rounded-md shadow-2xl bg-main-text-default w-11/12 mx-auto"
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
    >
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle
          className="text-light-main dark:text-dark-main"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        />
      </NavbarContent>

      <NavbarContent className="sm:hidden pr-3" justify="center">
        <NavbarBrand>
          <Logo />
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarBrand>
          <Logo />
        </NavbarBrand>
        {MenuLinks.map((item) => {
          return (
            <NavbarItem key={item.name}>
              <NavLink icon={item.icon} name={item.name} url={item.href} />
            </NavbarItem>
          );
        })}
      </NavbarContent>

      <NavbarContent justify="end">
        <Button as={Link} to="/login" variant="shadow" color="secondary">
          Login
        </Button>
      </NavbarContent>

      <NavbarMenu
        className="mx-auto py-10 flex flex-col gap-10 items-center md:w-11/12 w-10/12 rounded-md shadow-2xl bg-main-text-default"
        onClick={() => {
          setIsMenuOpen(false);
        }}
      >
        {MenuLinks.map((item) => {
          return (
            <NavbarMenuItem key={item.name}>
              <NavLink icon={item.icon} name={item.name} url={item.href} />
            </NavbarMenuItem>
          );
        })}
      </NavbarMenu>
    </Nav>
  );
}
