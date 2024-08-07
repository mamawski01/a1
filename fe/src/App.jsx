import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import LoginPage from "./Pages/LoginPage.jsx";
import PageNotFound from "./Pages/PageNotFound.jsx";
import DashboardPage from "./Pages/DashboardPage.jsx";
import HomePage from "./Pages/HomePage.jsx";
import AppLayout from "./reusable/layout/AppLayout.jsx";
import Test from "./reusable/test/Test.jsx";
import UserForm from "./Pages/UserForm.jsx";
import ConfirmUserPage from "./Pages/ConfirmUserPage.jsx";
import Upload from "./Pages/Upload.jsx";
import UserAttendance from "./reusable/components/UserAttendance.jsx";
import Attendance from "./Pages/Attendance.jsx";
import AttendanceId from "./Pages/AttendanceId.jsx";
import AttendanceSettingForm from "./Pages/AttendanceSettingForm.jsx";
import AttendanceSettingFormEdit from "./Pages/AttendanceSettingFormEdit.jsx";
import ScheduleForm from "./Pages/ScheduleForm.jsx";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout></AppLayout>}>
            <Route
              index
              element={<Navigate replace to="homepage"></Navigate>}
            ></Route>
            <Route path="homepage" element={<HomePage></HomePage>}></Route>
            <Route
              path="homepage/registerUser"
              element={<UserForm></UserForm>}
            ></Route>
            <Route
              path="homepage/registerUser/:id"
              element={<UserForm></UserForm>}
            ></Route>
            <Route
              path="dashboard"
              element={<DashboardPage></DashboardPage>}
            ></Route>
            <Route
              path="dashboard/confirmUser/:id"
              element={<ConfirmUserPage></ConfirmUserPage>}
            ></Route>
            <Route
              path="dashboard/confirmUser/userAttendance/:id"
              element={<UserAttendance></UserAttendance>}
            ></Route>
            <Route path="dashboard/upload" element={<Upload></Upload>}></Route>
            <Route
              path="dashboard/attendances"
              element={<Attendance></Attendance>}
            ></Route>
            <Route
              path="dashboard/attendances/:id"
              element={<AttendanceId></AttendanceId>}
            ></Route>
            <Route
              path="dashboard/attendance/attendanceSettingForm"
              element={<AttendanceSettingForm></AttendanceSettingForm>}
            ></Route>
            <Route
              path="dashboard/attendance/attendanceSettingForm/:id"
              element={<AttendanceSettingFormEdit></AttendanceSettingFormEdit>}
            ></Route>
            <Route
              path="dashboard/attendances/scheduleForm"
              element={<ScheduleForm></ScheduleForm>}
            ></Route>
          </Route>
          <Route path="login" element={<LoginPage></LoginPage>}></Route>
          <Route path="*" element={<PageNotFound></PageNotFound>}></Route>
          <Route path="test" element=<Test></Test>></Route>
        </Routes>
      </BrowserRouter>
      <Toaster
        position="bottom-right"
        reverseOrder={true}
        gutter={12}
      ></Toaster>
    </>
  );
}
