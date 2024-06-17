import PropTypes from "prop-types";
import { formatFontLabel, onHoverBgColor } from "../utils/helpers";
export default function Btn({
  text,
  type = "button",
  color,
  onClick = null,
  isPending,
  icons = "",
}) {
  const hoverBgColor = onHoverBgColor(color);
  const font = formatFontLabel(text);
  console.log(icons);
  return (
    <button
      onClick={onClick}
      type={type}
      disabled={isPending}
      className={`${hoverBgColor} rounded-md p-2 font-bold tracking-wider`}
    >
      {font}
      <span className="block">{icons && icons[0].icons}</span>
    </button>
  );
}

Btn.propTypes = {
  type: PropTypes.any,
  color: PropTypes.any,
  onClick: PropTypes.any,
  isPending: PropTypes.any,
  icons: PropTypes.any,
  text: PropTypes.any,
};
