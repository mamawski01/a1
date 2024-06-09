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
    <button onClick={onClick} className={`btn ${position} ${left} ${right}`}>
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
