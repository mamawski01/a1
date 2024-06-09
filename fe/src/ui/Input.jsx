import PropTypes from "prop-types";
export default function Input({ text, type = "text" }) {
  console.log(text.charAt(0).toUpperCase() + text.slice(1));
  return (
    <input
      type={type}
      placeholder={text.charAt(0).toUpperCase() + text.slice(1)}
      id={text}
      className="w-full rounded-lg border border-gray-400 px-4 py-2 placeholder:text-stone-500 focus:outline-none focus:ring focus:ring-gray-500"
      autoComplete="off"
    />
  );
}

Input.propTypes = {
  onChange: PropTypes.func,
  text: PropTypes.any,
  type: PropTypes.string,
};
