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
}) {
  const hoverBgColor = onHoverBgColor(color);
  const font = formatFontLabel(text);
  if (type === "link")
    return (
      <Link
        to={to}
        className={`${hoverBgColor} flex items-center gap-1 rounded-md p-2 font-bold tracking-wider`}
      >
        <span className="w-7">{icon.icon ? icon.icon : icon[0].icon}</span>
        {font}
      </Link>
    );

  return (
    <button
      onClick={onClick}
      type={type}
      className={`${hoverBgColor} flex items-center gap-1 rounded-md p-2 font-bold tracking-wider`}
    >
      <span className="w-7">{icon.icon ? icon.icon : icon[0].icon}</span>
      {font}
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
};
