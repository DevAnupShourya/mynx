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
import { MenuLinks } from "~/utils/data/data.barrel";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <Nav
      shouldHideOnScroll
      isBordered
      className="bg-main-text-default py-2"
      // border-b dark:border-white light:border-black
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
    >
      {/* Nav Mobile */}
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle
          className="text-light-main dark:text-dark-main"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        />
      </NavbarContent>
      <NavbarMenu
        onClick={() => {
          setIsMenuOpen(false);
        }}
        className="bg-main-text-main w-full h-full py-10 grid place-items-center"
      >
        {MenuLinks.map((item) => {
          return (
            <NavbarMenuItem key={item.name}>
              <NavLink
                icon={item.icon}
                name={item.name}
                url={item.href}
                withName={true}
              />
            </NavbarMenuItem>
          );
        })}
      </NavbarMenu>
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarBrand>
          <Logo />
        </NavbarBrand>
      </NavbarContent>

      {/* Nav Desktop */}
      <NavbarBrand className="max-sm:hidden">
        <Logo />
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {MenuLinks.map((item) => {
          return (
            <NavbarItem key={item.name}>
              <NavLink icon={item.icon} name={item.name} url={item.href} />
            </NavbarItem>
          );
        })}
      </NavbarContent>

      <NavbarContent justify="end">
        <Button
          as={Link}
          to="/login"
          variant="light"
          color="primary"
          className="max-sm:hidden"
        >
          Login
        </Button>
        <Button as={Link} to="/signup" variant="shadow" color="secondary">
          Create Account
        </Button>
      </NavbarContent>
    </Nav>
  );
}
