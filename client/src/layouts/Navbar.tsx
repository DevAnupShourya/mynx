import { Link } from "react-router-dom";

import {Button} from "@nextui-org/react";

import Logo from "~/components/logo/Logo";

export default function Navbar() {
  return (
    <nav className="px-[6vw] py-[2vh] flex flex-row flex-nowrap justify-between items-center">
      <Logo />
      <div>
        <Button
          as={Link}
          to="/login"
          variant="light"
          color="primary"
          size="sm"
        >
          Login
        </Button>
        <Button as={Link} to="/signup" variant="shadow" color="secondary" className="ml-5">
          Create Account
        </Button>
      </div>
    </nav>
  );
}
