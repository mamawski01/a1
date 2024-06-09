import PropTypes from "prop-types";
export default function TextArea({ text, onChange = () => {} }) {
  return (
    <textarea
      placeholder={text}
      id={text}
      value={text}
      onChange={onChange}
      className="w-full rounded-lg border border-gray-400 px-4 py-2 placeholder:text-stone-500 focus:outline-none focus:ring focus:ring-gray-500"
      autoComplete="off"
    >
      {text}
    </textarea>
  );
}

TextArea.propTypes = {
  onChange: PropTypes.func,
  text: PropTypes.any,
};
