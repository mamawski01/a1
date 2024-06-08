import { Link } from "react-router-dom";
import Logo from "./Logo";

export default function Header() {
  return (
    <header className="col-span-4 flex h-12 items-center border-b border-blue-500 bg-blue-950 p-1 text-center text-sky-100">
      <Link to={"/"}>
        <Logo></Logo>
      </Link>
    </header>
  );
}
