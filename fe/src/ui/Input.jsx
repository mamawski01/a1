import PropTypes from "prop-types";
export default function Input({ text, type = "text" }) {
  const font =
    text.toLowerCase().charAt(0).toUpperCase() + text.toLowerCase().slice(1);

  return (
    <input
      type={type}
      placeholder={font}
      id={text}
      className="w-full rounded-lg border border-gray-400 bg-slate-700 px-4 py-2 placeholder:text-sky-500 focus:outline-none focus:ring focus:ring-gray-500"
      autoComplete="off"
    />
  );
}

Input.propTypes = {
  onChange: PropTypes.func,
  text: PropTypes.any,
  type: PropTypes.string,
};
