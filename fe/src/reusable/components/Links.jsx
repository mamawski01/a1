import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import { formatFontLabel, onHoverBgColor } from "../utils/helpers";

export default function Links({
  hidden,
  text,
  icons,
  to = "/xxx",
  url = "",
  color = "",
}) {
  return (
    <div className="flex gap-1 md:gap-2 lg:gap-4">
      {text.map((text, i) => (
        <LinkBtn
          key={i}
          text={text}
          hidden={hidden[i]}
          icons={icons[i]}
          to={to[i]}
          i={i}
          url={url}
          color={color[i]}
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

function LinkBtn({ text, icons, hidden, to, url, color = [] }) {
  const active = url === to;

  const font = formatFontLabel(text);
  const hoverBgColor = onHoverBgColor(color);

  return (
    <NavLink
      to={to}
      className={`${hidden && "hidden"} relative flex items-center gap-1 rounded-full font-bold md:flex lg:rounded lg:p-1 ${hoverBgColor} my-auto h-fit`}
      title={font}
    >
      <span
        className={`${hoverBgColor} h-8 w-8 rounded-full p-1 text-white lg:bg-transparent lg:hover:bg-transparent`}
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
