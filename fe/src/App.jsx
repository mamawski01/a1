import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import LoginPage from "./Pages/LoginPage.jsx";
import PageNotFound from "./Pages/PageNotFound.jsx";
import DashboardPage from "./Pages/DashboardPage.jsx";
import HomePage from "./Pages/HomePage.jsx";
import AppLayout from "./reusable/layout/AppLayout.jsx";
import Test from "./reusable/test/Test.jsx";
import UserForm from "./Pages/UserForm.jsx";

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
            <Route path="registerUser" element={<UserForm></UserForm>}></Route>
            <Route
              path="dashboard"
              element={<DashboardPage></DashboardPage>}
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
