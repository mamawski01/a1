import PropTypes from "prop-types";
export default function UserAttendance({ attendance }) {
  return (
    <div className="flex gap-2">
      <span>{attendance.No}</span>
      <span>{attendance.UserId}</span>
      <span>{attendance.Name}</span>
      <span>{attendance.Mode}</span>
      <span>{attendance.DateTime}</span>
    </div>
  );
}

UserAttendance.propTypes = {
  attendance: PropTypes.any,
};
