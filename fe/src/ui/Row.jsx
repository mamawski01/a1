import PropTypes from "prop-types";
export default function Row({ children, type = "", span = "" }) {
  return (
    <div className={`mb-1 flex items-center gap-1 ${type} ${span}`}>
      {children}
    </div>
  );
}

Row.propTypes = {
  children: PropTypes.any,
  span: PropTypes.string,
  type: PropTypes.string,
};
