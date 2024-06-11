import PropTypes from "prop-types";
export default function Box({ children }) {
  return (
    <div className="mx-auto gap-3 sm:flex md:grid md:w-fit">{children}</div>
  );
}

Box.propTypes = {
  children: PropTypes.any,
};
