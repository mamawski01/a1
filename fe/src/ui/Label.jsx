import PropTypes from "prop-types";
export default function Label({ text }) {
  const font =
    text.toLowerCase().charAt(0).toUpperCase() + text.toLowerCase().slice(1);
  return (
    <label htmlFor={text} className="font-bold">
      {font}
    </label>
  );
}

Label.propTypes = {
  text: PropTypes.any,
};
