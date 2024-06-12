import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";

export default function Links({ hidden, text, icons, to = "/xxx", url = "" }) {
  return (
    <div className="flex gap-2 lg:gap-1">
      {text.map((text, i) => (
        <LinkBtn
          key={i}
          text={text}
          hidden={hidden[i]}
          icons={icons[i]}
          to={to[i]}
          i={i}
          url={url[i]}
        ></LinkBtn>
      ))}
    </div>
  );
}

Links.propTypes = {
  hidden: PropTypes.any,
  icons: PropTypes.any,
  text: PropTypes.any,
  to: PropTypes.any,
  url: PropTypes.any,
};

function LinkBtn({ text, icons, hidden, to, url }) {
  const result = url === "/addUser";
  console.log(result);

  return (
    <NavLink
      to={to}
      className={`${hidden && "hidden"} $ active relative flex items-center gap-1 rounded-full font-bold md:flex lg:rounded lg:p-1 lg:hover:bg-blue-700`}
      title={text}
    >
      {icons.icons}
      <span className="hidden lg:block lg:pr-2">{text}</span>
      {result && (
        <span className="absolute right-0 top-0 inline-flex h-3 w-3 rounded-full bg-sky-500">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75"></span>
        </span>
      )}
    </NavLink>
  );
}

LinkBtn.propTypes = {
  hidden: PropTypes.any,
  to: PropTypes.any,
  icons: PropTypes.any,
  text: PropTypes.any,
  url: PropTypes.any,
};
