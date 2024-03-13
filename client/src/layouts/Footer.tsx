import { Link } from "react-router-dom";
import { Link as LinkBtn } from "@nextui-org/react";
import { FaXTwitter, FaDiscord } from "react-icons/fa6";
import { LuLinkedin } from "react-icons/lu";

export default function Footer() {
  return (
    <footer className="bg-main-text-default px-10 py-14 flex flex-wrap justify-between items-center max-sm:gap-4 max-sm:justify-center">
      <div className="text-left ">
        <span className="text-sm">
          &copy; 2024{" "}
          <LinkBtn as={Link} href="/">
            Mynx
          </LinkBtn>
          . All Rights Reserved.
        </span>
      </div>
      <div className="">
        <LinkBtn
          color="foreground"
          as={Link}
          to="https://twitter.com/Shourya_Anup"
          isExternal
          className="mx-5"
        >
          <FaXTwitter />
        </LinkBtn>
        <LinkBtn
          color="foreground"
          as={Link}
          to="https://www.linkedin.com/in/anupshourya/"
          isExternal
          className="mx-5"
        >
          <LuLinkedin />
        </LinkBtn>
        <LinkBtn
          color="foreground"
          as={Link}
          to="https://discord.com/users/anup_shourya_90968"
          isExternal
          className="mx-5"
        >
          <FaDiscord />
        </LinkBtn>
      </div>
    </footer>
  );
}
