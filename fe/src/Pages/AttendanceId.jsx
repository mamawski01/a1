import { apiAttendanceId, apiAttendanceIdPatch } from "../api/attendanceId";
import Form from "../reusable/components/Form";

export default function AttendanceId() {
  return (
    <Form
      dataEdit={apiAttendanceIdPatch}
      dataDefaultVal={apiAttendanceId}
      data={[
        {
          label: {
            rowLabels: "Assign Attendance Id",
            inputs: ["attendanceId"],
            isRequired: [false],
          },
        },
      ]}
    ></Form>
  );
}
