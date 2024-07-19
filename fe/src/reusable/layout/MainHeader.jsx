import {
  Bars3Icon,
  Cog6ToothIcon,
  MagnifyingGlassIcon,
  PaperClipIcon,
  PlusIcon,
  UserGroupIcon,
  UserIcon,
} from "@heroicons/react/24/solid";
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

import Logo from "../components/Logo";
import Links from "../components/Links";
import Btn from "../components/Btn";
import Options from "../components/Options";

export default function MainHeader() {
  const location = useLocation();
  const url = location.pathname;

  const [showOptions, showOptionsSet] = useState(false);

  const optionRef = useRef();

  useEffect(() => {
    function callBack(e) {
      if (!optionRef?.current?.contains(e.target)) {
        showOptionsSet(false);
      }
    }
    document.addEventListener("click", callBack);
    //cleaning
    return () => {
      document.removeEventListener("click", callBack);
    };
  }, [showOptionsSet, showOptions]);

  return (
    <header className="mainHeader">
      <div className="mainSubHeader">
        <div className="flex gap-2">
          <Logo text="TEC" imgSrc={"/Asset2.png"}></Logo>
          <Links
            data={[
              {
                link: {
                  text: "Search",
                  hidden: false,
                  to: "search",
                  url: url,
                  icon: <MagnifyingGlassIcon></MagnifyingGlassIcon>,
                },
              },
            ]}
          ></Links>
        </div>

        <div className="flex gap-4">
          <Btn
            bgColorActive={showOptions}
            text={"options"}
            type="button"
            icon={[
              {
                icon: <Bars3Icon></Bars3Icon>,
              },
            ]}
            onClick={() => showOptionsSet(!showOptions)}
            optionRef={optionRef}
          ></Btn>
          {showOptions && (
            <div className="absolute top-14 z-50">
              <Options
                showOptionsSet={showOptionsSet}
                showOptions={showOptions}
              >
                <Links
                  flexCol={true}
                  data={[
                    {
                      link: {
                        text: "attendance",
                        hidden: true,
                        to: "/dashboard/attendances",
                        url: url,
                        icon: <UserGroupIcon />,
                        onClick: null,
                      },
                    },
                    {
                      link: {
                        text: "Uploads",
                        hidden: true,
                        to: "/dashboard/upload",
                        url: url,
                        icon: <PaperClipIcon />,
                        onClick: null,
                      },
                    },
                    {
                      link: {
                        text: "AttendanceSetting",
                        hidden: true,
                        to: "/dashboard/attendance/attendanceSettingForm",
                        url: url,
                        icon: <Cog6ToothIcon />,
                        onClick: null,
                      },
                    },
                    {
                      link: {
                        text: "Account",
                        hidden: true,
                        to: "/homepage/account",
                        url: url,
                        icon: <UserIcon />,
                        onClick: null,
                      },
                    },
                  ]}
                ></Links>
              </Options>
            </div>
          )}
          <Links
            data={[
              {
                link: {
                  text: "AddUser",
                  hidden: true,
                  to: "/homepage/registerUser",
                  url: url,
                  icon: <PlusIcon />,
                  onClick: null,
                },
              },
              {
                link: {
                  text: "Account",
                  hidden: true,
                  to: "/homepage/account",
                  url: url,
                  icon: <UserIcon />,
                  onClick: null,
                },
              },
            ]}
          ></Links>
        </div>
      </div>
    </header>
  );
}
