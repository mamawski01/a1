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
  return (
    <button
      onClick={onClick}
      type={type}
      disabled={isPending}
      className={`${hoverBgColor} flex items-center gap-1 rounded-md p-2 font-bold tracking-wider`}
    >
      <span className="w-7">{icons && icons[0].icons}</span>
      {font}
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
