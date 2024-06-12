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
            icons={[
              {
                icons: (
                  <MagnifyingGlassIcon className="heroIcons"></MagnifyingGlassIcon>
                ),
              },
            ]}
          ></Links>
        </div>

        <Links
          text={["Options", "Add", "Account"]}
          hidden={[false, true, true]}
          onClick={[null, null, null]}
          to={["/options", "/addUser", "/account"]}
          url={[url, url, url]}
          icons={[
            {
              icons: <Bars4Icon className="heroIcons"></Bars4Icon>,
            },
            { icons: <PlusIcon className="heroIcons"></PlusIcon> },
            { icons: <UserIcon className="heroIcons"></UserIcon> },
          ]}
        ></Links>
      </div>
    </header>
  );
}
