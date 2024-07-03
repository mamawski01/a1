import PropTypes from "prop-types";

export default function Options({ children }) {
  return <div className="bg flex w-full flex-col p-3">{children}</div>;
}

Options.propTypes = {
  children: PropTypes.any,
};
