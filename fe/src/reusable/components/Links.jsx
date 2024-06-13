import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";

export default function Links({
  hidden,
  text,
  icons,
  to = "/xxx",
  url = "",
  color = "",
}) {
  return (
    <div className="flex gap-2 lg:gap-1">
      {text.map((text, i) => (
        <LinkBtn
          key={i}
          text={text}
          hidden={hidden[i]}
          icons={icons[i]}
          to={to[i]}
          i={i}
          url={url}
          color={color}
        ></LinkBtn>
      ))}
    </div>
  );
}

Links.propTypes = {
  hidden: PropTypes.any,
  icons: PropTypes.any,
  text: PropTypes.any,
  to: PropTypes.any,
  url: PropTypes.any,
  color: PropTypes.any,
};

function LinkBtn({ text, icons, hidden, to, url, color }) {
  const active = url === to;

  const font =
    text.charAt(0).toUpperCase() + text.slice(1).replace(/([A-Z])/g, " $1");

  return (
    <NavLink
      to={to}
      className={`${hidden && "hidden"} relative flex items-center gap-1 rounded-full font-bold md:flex lg:rounded lg:p-1 ${color ? "lg:hover:bg-red-700" : "lg:hover:bg-blue-700"}`}
      title={font}
    >
      <span
        className={`lg:hover:bg-transparent; h-8 w-8 rounded-full p-1 text-white hover:bg-gray-400 lg:bg-transparent ${color && "hover:bg-red-700"}`}
      >
        {icons.icons}
      </span>
      <span className="hidden lg:block lg:pr-2">{font}</span>
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
  icons: PropTypes.any,
  text: PropTypes.any,
  url: PropTypes.any,
  color: PropTypes.any,
};
