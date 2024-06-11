import PropTypes from "prop-types";
export default function Btn({
  children,
  position = "",
  left = "",
  right = "",
  text = "Add text",
  onClick = () => {},
}) {
  return (
    <button
      onClick={onClick}
      className={`hover:bg-blue-400; flex gap-2 rounded bg-blue-500 px-2 py-1 font-bold text-white ${position} ${left} ${right}`}
    >
      {children}
      <span className="hidden md:block">{text}</span>
    </button>
  );
}

Btn.propTypes = {
  children: PropTypes.any,
  left: PropTypes.string,
  onClick: PropTypes.func,
  position: PropTypes.string,
  right: PropTypes.string,
  text: PropTypes.string,
};
