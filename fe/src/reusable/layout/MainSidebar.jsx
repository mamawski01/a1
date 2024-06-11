import PropTypes from "prop-types";
export default function MainSidebar({ children }) {
  return <aside className="mainSidebar">{children}</aside>;
}

MainSidebar.propTypes = {
  children: PropTypes.any,
};
