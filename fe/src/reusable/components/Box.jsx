import PropTypes from "prop-types";
export default function Box({ children }) {
  return (
    <div className="container mx-auto even:bg-white sm:flex md:grid">
      {children}
    </div>
  );
}

Box.propTypes = {
  children: PropTypes.any,
};
