import { Link } from "react-router-dom";

export default function Logo() {
  return (
    <Link
      to="/"
      id="logo"
      className="text-4xl text-black dark:text-white p-2 uppercase border-1 border-dashed border-black dark:border-white"
    >
      vixel
    </Link>
  );
}
