import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";

export default function AppLayout() {
  return (
    <div className="relative grid h-full grid-cols-4 flex-col text-blue-100">
      <Header></Header>
      <Sidebar></Sidebar>
      <main className="absolute bottom-0 left-16 right-0 top-12 overflow-y-auto bg-gray-900 p-2">
        <Outlet></Outlet>
      </main>
    </div>
  );
}
