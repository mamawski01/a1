import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import LoginPage from "./Pages/LoginPage.jsx";
import PageNotFound from "./Pages/PageNotFound.jsx";
import DashboardPage from "./Pages/DashboardPage.jsx";
import HomePage from "./Pages/HomePage.jsx";
import AppLayout from "./reusable/layout/AppLayout.jsx";
import UserForm from "./project/UserForm.jsx";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false}></ReactQueryDevtools>
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout></AppLayout>}>
            <Route
              path="/"
              element={<Navigate replace to="/homepage"></Navigate>}
            ></Route>
            <Route path="/homepage" element={<HomePage></HomePage>}></Route>
            <Route
              path="/dashboard"
              element={<DashboardPage></DashboardPage>}
            ></Route>
            <Route path="/addUser" element={<UserForm></UserForm>}></Route>
          </Route>
          <Route path="/login" element={<LoginPage></LoginPage>}></Route>
          <Route path="*" element={<PageNotFound></PageNotFound>}></Route>
        </Routes>
      </BrowserRouter>
      <Toaster position="bottom-right"></Toaster>
    </QueryClientProvider>
  );
}
