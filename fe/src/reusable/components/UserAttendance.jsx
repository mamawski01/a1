import PropTypes from "prop-types";
export default function UserAttendance({ data }) {
  console.log(data.data.name);
  return (
    <div className="flex gap-2">
      <div>
        <span>{data.data.no}</span>
        <span>{data.data.userId}</span>
        <span>{data.data.name}</span>
        <span>{data.data.mode}</span>
        <span>{data.data.date}</span>
      </div>
    </div>
  );
}

UserAttendance.propTypes = {
  data: PropTypes.any,
};
