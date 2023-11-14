import { NavLink } from "~/components/components.barrel";
import { AuthMenuLinks } from "~/utils/data/data.barrel";

function NavbarMobilePrivate() {
  return (
    <nav className="max-sm:w-full max-md:w-11/12 w-10/12 rounded-md shadow-2xl max-md:px-1 px-5 py-4 f-row bg-main-text-default justify-around">
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
    </nav>
  );
}

export default NavbarMobilePrivate;
