import PropTypes from "prop-types";
export default function Box({ children }) {
  return <div className="gap-3 sm:flex md:grid">{children}</div>;
}

Box.propTypes = {
  children: PropTypes.any,
};
