import PropTypes from "prop-types";
import Btn from "./Btn";
import { useState } from "react";
import { capitalizeFirstLetter } from "../utils/helpers";

export default function Card({
  imgSrc = "",
  mainTitle = [],
  mainDescription = [],
  icons = [],
  btn = [],
}) {
  const [expand, expandSet] = useState(false);
  return (
    <>
      <div className="container2">
        <div
          className="flex cursor-pointer flex-col items-center justify-center rounded-lg p-1 hover:bg-slate-200/20"
          onClick={() => expandSet(!expand)}
        >
          <img
            src={imgSrc}
            onError={(e) => {
              e.target.src = "/Asset2.png";
              e.target.alt = "Asset2.png";
              e.target.title = "Asset2.png";
            }}
            alt={imgSrc}
            className="h-32 w-32 rounded-full object-cover"
            title={imgSrc}
          />
          <div className="flex flex-col items-center">
            <h1 className="flex flex-wrap justify-center gap-x-1 text-lg font-semibold tracking-wide md:text-3xl">
              {mainTitle.map((text, i) => (
                <span key={i} className="text-nowrap">
                  {capitalizeFirstLetter(text)}
                </span>
              ))}
            </h1>
            <p className="flex flex-wrap justify-center gap-x-1">
              {mainDescription.map((text, i) => (
                <span
                  key={i}
                  className="text-nowrap capitalize first:w-full first:font-bold first:tracking-wide"
                >
                  {text}
                </span>
              ))}
            </p>
          </div>
        </div>

        {expand &&
          icons.map((icon, i) => (
            <Content
              key={i}
              icon={icon}
              iconsDetails={icons[i].iconsDetails}
            ></Content>
          ))}
        <div className="mt-6 flex flex-wrap justify-evenly">
          {btn.map((onclick, i) => (
            <Btn
              key={i}
              onClick={onclick.btn.function}
              text={onclick.btn.text}
              color={onclick.btn.color}
              icon={onclick.btn.icon}
              to={onclick.btn.to}
              type={onclick.btn.type}
            ></Btn>
          ))}
        </div>
      </div>
    </>
  );
}

Card.propTypes = {
  icons: PropTypes.any,
  imgSrc: PropTypes.any,
  mainTitle: PropTypes.any,
  mainDescription: PropTypes.any,
  btn: PropTypes.any,
};

function Content({ icon = [], iconsDetails = [] }) {
  if (iconsDetails.filter((element) => element !== "").length === 0)
    return null;
  return (
    <div className="flex flex-col gap-2">
      <div className="mt-3 flex flex-wrap justify-center gap-1">
        <span className="w-5">{icon.icons}</span>
        {iconsDetails
          .filter((element) => element !== "")
          .map((text, i) => (
            <span key={i} className="">
              {text && text}
              {i === iconsDetails.length - 1 ? null : text ? "," : ""}
            </span>
          ))}
      </div>
    </div>
  );
}

Content.propTypes = {
  icon: PropTypes.any,
  iconsDetails: PropTypes.any,
};
