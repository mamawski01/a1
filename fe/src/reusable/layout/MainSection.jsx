import PropTypes from "prop-types";

export default function MainSection({ children }) {
  return <div className="mainSection">{children}</div>;
}

MainSection.propTypes = {
  children: PropTypes.any,
};
