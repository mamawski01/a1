import {
  apiAttendanceSettingPatch,
  apiAttendanceSetting,
} from "../api/attendanceSetting";
import Form from "../reusable/components/Form";
import { attendanceSettingModel } from "../reusable/utils/model";

export default function AttendanceSettingFormEdit() {
  return (
    <Form
      dataEdit={apiAttendanceSettingPatch}
      dataDefaultVal={apiAttendanceSetting}
      data={attendanceSettingModel()}
    ></Form>
  );
}
