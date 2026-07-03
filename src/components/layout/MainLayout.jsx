import { Outlet } from "react-router-dom";

import Sidebar from "./Sidebar";
import RightSidebar from "./RightSidebar";
import ModalProvider from "../ui/Modal/ModalProvider";

function MainLayout() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <div className="mx-auto flex max-w-7xl">
        <Sidebar />

        <main className="min-h-screen flex-1 border-x border-zinc-800">
          <Outlet />
        </main>

        <RightSidebar />
      </div>

      <ModalProvider />
    </div>
  );
}

export default MainLayout;
