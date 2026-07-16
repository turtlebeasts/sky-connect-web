import { Outlet } from "react-router-dom";

import Sidebar from "./Sidebar";
import RightSidebar from "./RightSidebar";
import MobileBottomNav from "./MobileBottomNav";
import ModalProvider from "../ui/Modal/ModalProvider";

function MainLayout() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <div className="mx-auto flex min-h-screen max-w-[1600px]">
        <Sidebar />

        <main className="flex-1 pb-20 lg:border-x lg:border-zinc-800 lg:pb-0">
          <Outlet />
        </main>

        <RightSidebar />
      </div>

      <MobileBottomNav />

      <ModalProvider />
    </div>
  );
}

export default MainLayout;
