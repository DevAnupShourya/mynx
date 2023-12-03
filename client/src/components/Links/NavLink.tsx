import { Tooltip, Link } from "@nextui-org/react";
import { IconType } from "react-icons";
import { useLocation, Link as RouterLink } from "react-router-dom";

interface nav_item {
  icon: IconType;
  name: string;
  url: string;
}

export default function NavLink({ icon, name, url }: nav_item) {
  const Icon = icon;
  const location = useLocation();

  return (
    <Tooltip content={name} className="">
      <Link
        as={RouterLink}
        to={url}
        className={`flex justify-center items-center p-2 transition-colors rounded-md tracking-widest outline-none border-none text-xl  ${
          location.pathname === url ? "bg-primary text-white" : ""
        }`}
        title={name}
      >
        <Icon />
      </Link>
    </Tooltip>
  );
}
