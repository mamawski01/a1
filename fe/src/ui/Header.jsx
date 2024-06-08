import { Link } from "react-router-dom";
import Logo from "./Logo";

export default function Header() {
  return (
    <header className="flex bg-blue-950 p-1 text-sky-100">
      <Link to={"/"}>
        <Logo></Logo>
      </Link>
    </header>
  );
}
