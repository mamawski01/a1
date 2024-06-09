import PropTypes from "prop-types";
export default function Label({ text }) {
  return (
    <label htmlFor={text} className="font-bold">
      {text.charAt(0).toUpperCase() + text.slice(1)}
    </label>
  );
}

Label.propTypes = {
  text: PropTypes.any,
};
