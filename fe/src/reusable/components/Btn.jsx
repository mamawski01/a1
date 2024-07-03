import PropTypes from "prop-types";
import { formatFontLabel, onHoverBgColor } from "../utils/helpers";
import { Link } from "react-router-dom";
export default function Btn({
  text = "",
  type = "",
  color = "",
  onClick = null,
  icon = "",
  to = "",
  bgColorActive,
  optionRef,
}) {
  const hoverBgColor = onHoverBgColor(color);
  const font = formatFontLabel(text);
  if (type === "link")
    return (
      <Link
        to={to}
        className={`${hoverBgColor} flex items-center gap-1 rounded-md p-1 px-2 font-bold tracking-wider`}
      >
        <span className="w-7">{icon.icon ? icon.icon : icon[0].icon}</span>
        <span className="hidden md:block">{font}</span>
      </Link>
    );

  return (
    <button
      onClick={onClick}
      type={type}
      className={`${hoverBgColor} ${bgColorActive && "active"} relative flex items-center gap-1 rounded-md p-1 px-2 font-bold tracking-wider`}
      ref={optionRef}
    >
      <span className="w-7">{icon.icon ? icon.icon : icon[0].icon}</span>
      <span className="hidden md:block">{font}</span>
      {bgColorActive && (
        <span className="absolute -right-1 -top-1 inline-flex h-3 w-3 rounded-full bg-purple-500">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-purple-400 opacity-75"></span>
        </span>
      )}
    </button>
  );
}

Btn.propTypes = {
  type: PropTypes.any,
  color: PropTypes.any,
  onClick: PropTypes.any,
  icon: PropTypes.any,
  text: PropTypes.any,
  to: PropTypes.any,
  bgColorActive: PropTypes.any,
  optionRef: PropTypes.any,
};
