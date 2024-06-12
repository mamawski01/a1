import { Link } from "react-router-dom";

export default function Logo() {
  return (
    <Link to={"/"}>
      <div className="flex items-center justify-center text-center">
        <img src="/Asset2.png" alt="" className="h-10" />
        <h3 className="font-bold tracking-wider">TEC</h3>
      </div>
    </Link>
  );
}
