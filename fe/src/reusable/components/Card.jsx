import PropTypes from "prop-types";
import Btn from "./Btn";
import { useState } from "react";

export default function Card({
  imgSrc = "",
  mainTitle = [],
  mainDescription = [],
  icons = [],
  iconsDetails = [],
  onclick = [],
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
                  {text}
                </span>
              ))}
            </h1>
            <p className="flex flex-wrap justify-center gap-x-1">
              {mainDescription.map((text, i) => (
                <span
                  key={i}
                  className="text-nowrap first:w-full first:font-bold first:tracking-wide"
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
              iconsDetails={iconsDetails[i]}
            ></Content>
          ))}
        <div className="mt-6 flex flex-wrap justify-evenly">
          {onclick.map((onclick, i) => (
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
  apiUserDeleteUser: PropTypes.any,
  icons: PropTypes.any,
  imgSrc: PropTypes.any,
  mainTitle: PropTypes.any,
  mainDescription: PropTypes.any,
  iconsDetails: PropTypes.any,
  onclick: PropTypes.any,
  editShowForm: PropTypes.any,
};

function Content({ icon = [], iconsDetails = [] }) {
  return (
    <div className="flex flex-col gap-2">
      <div className="mt-3 flex flex-wrap justify-center gap-1">
        <span className="w-5">{icon.icons}</span>
        {iconsDetails.map((text, i) => (
          <span key={i}>
            {text}
            {i === iconsDetails.length - 1 ? "" : ","}
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
