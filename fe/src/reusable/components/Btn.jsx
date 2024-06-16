import PropTypes from "prop-types";
import { onHoverBgColor } from "../utils/helpers";
export default function Btn({ children, type, color, onClick = null }) {
  const hoverBgColor = onHoverBgColor(color);

  return (
    <button
      onClick={onClick}
      type={type}
      className={`${hoverBgColor} rounded-md p-2 font-bold tracking-wider`}
    >
      {children}
    </button>
  );
}

Btn.propTypes = {
  children: PropTypes.any,
  type: PropTypes.any,
  color: PropTypes.any,
  onClick: PropTypes.any,
};
