import { Link } from "react-router-dom";

export default function Logo() {
  return (
    <Link
      id="logo"
      to="/"
      aria-label="Mynx Logo"
      className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary via-green-600 to-secondary"
      title="Mynx"
    >
      M
    </Link>
  );
}
