import { Link as LinkButton } from "@nextui-org/link";
import { Tooltip } from "@nextui-org/tooltip";
import { Link } from "react-router-dom";
import { IconType } from "react-icons";

interface nav_item {
  icon: IconType;
  name: string;
  url: string;
  active: boolean;
}

export default function NavLink({ icon, name, url, active }: nav_item) {
  const Icon = icon;
  return (
    <Tooltip content={name} className="bg-all shadow-2xl">
      <LinkButton
        to={url}
        as={Link}
        className={`grid place-items-center p-2 transition-colors rounded-md tracking-widest dark:hover:bg-dark-default hover:bg-light-default ${
          active ? "bg-light-default dark:bg-dark-default shadow-2xl" : null
        }`}
        title={name}
      >
        <h1
          className={`dark:text-dark-default text-light-default ${
            active ? "dark:text-dark-main text-light-main" : null
          }`}
        >
          <Icon />
        </h1>
      </LinkButton>
    </Tooltip>
  );
}
