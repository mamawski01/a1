import {
  apiAttendanceSettingPatch,
  apiAttendanceSetting,
  apiAttendanceSettingPost,
} from "../api/attendanceSetting";
import Form from "../reusable/components/Form";
import { attendanceSettingModel } from "../reusable/utils/model";

export default function AttendanceSettingFormEdit() {
  return (
    <Form
      dataSave={apiAttendanceSettingPost}
      dataEdit={apiAttendanceSettingPatch}
      dataDefaultVal={apiAttendanceSetting}
      data={attendanceSettingModel()}
    ></Form>
  );
}
