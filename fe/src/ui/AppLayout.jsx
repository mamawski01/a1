import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";

export default function AppLayout({ children }) {
  return (
    <div>
      <Header></Header>
      <Sidebar></Sidebar>
      <main className="">
        <Outlet></Outlet>
      </main>
    </div>
  );
}
