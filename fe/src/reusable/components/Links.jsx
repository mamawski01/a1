import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import { formatFontLabel, onHoverBgColor } from "../utils/helpers";

export default function Links({ data, flexCol }) {
  return (
    <div className={`${flexCol && "flex-col"} flex gap-1 md:gap-2 lg:gap-4`}>
      {data.map((data, i) => (
        <LinkBtn
          key={i}
          text={data.link.text}
          hidden={data.link.hidden}
          icon={data.link.icon}
          to={data.link.to}
          i={i}
          url={data.link.url}
          color={data.link.color}
        ></LinkBtn>
      ))}
    </div>
  );
}

Links.propTypes = {
  data: PropTypes.any,
  flexCol: PropTypes.any,
};

function LinkBtn({ text, icon, hidden, to, url, color = null }) {
  const active = url === to;

  const font = formatFontLabel(text);
  const hoverBgColor = onHoverBgColor(color);

  return (
    <NavLink
      to={to}
      className={`${hidden && "hidden"}sm:block relative flex items-center gap-1 rounded-full font-bold md:flex lg:rounded lg:p-1 ${hoverBgColor} my-auto h-fit`}
      title={font}
    >
      <span
        className={`${hoverBgColor} h-8 w-8 rounded-full p-1 text-white lg:bg-transparent lg:hover:bg-transparent`}
      >
        {icon}
      </span>
      <span className="hidden md:block lg:pr-2">{font}</span>
      {active && (
        <span className="absolute -right-1 -top-1 inline-flex h-3 w-3 rounded-full bg-sky-500">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75"></span>
        </span>
      )}
    </NavLink>
  );
}

LinkBtn.propTypes = {
  hidden: PropTypes.any,
  to: PropTypes.any,
  icon: PropTypes.any,
  text: PropTypes.any,
  url: PropTypes.any,
  color: PropTypes.any,
};
