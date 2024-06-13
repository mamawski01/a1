import {
  Bars4Icon,
  MagnifyingGlassIcon,
  PlusIcon,
  UserIcon,
} from "@heroicons/react/24/solid";
import { useLocation } from "react-router-dom";

import Logo from "../components/Logo";
import Links from "../components/Links";

export default function MainHeader() {
  const location = useLocation();
  const url = location.pathname;

  return (
    <header className="mainHeader">
      <div className="mainSubHeader">
        {/* children are limited */}
        <div className="flex gap-2">
          <Logo text="TEC" imgSrc={"/Asset2.png"}></Logo>
          <Links
            text={["Search"]}
            hidden={[false]}
            to={["/search"]}
            url={url}
            icons={[
              {
                icons: <MagnifyingGlassIcon></MagnifyingGlassIcon>,
              },
            ]}
          ></Links>
        </div>

        <Links
          text={["Options", "AddUser", "Account"]}
          hidden={[false, true, true]}
          onClick={[null, null, null]}
          to={["/options", "/registerUser", "/account"]}
          url={url}
          icons={[
            {
              icons: <Bars4Icon></Bars4Icon>,
            },
            { icons: <PlusIcon></PlusIcon> },
            { icons: <UserIcon></UserIcon> },
          ]}
        ></Links>
      </div>
    </header>
  );
}
