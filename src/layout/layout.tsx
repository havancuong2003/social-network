import React from "react";
import { Header } from "../components/header/header";
import { SideBar } from "../components";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  // Trạng thái mở/đóng Sidebar
  const [isSidebarOpen, setSidebarOpen] = React.useState(false);

  // Hàm toggle Sidebar
  const handleSidebarToggle = () => setSidebarOpen((prev) => !prev);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <SideBar isOpen={isSidebarOpen} />

      {/* Nội dung */}
      <div className="flex flex-col w-full lg:ml-[20%]">
        {/* Header */}
        <div className="bg-blue-600 text-white fixed top-0 left-0 right-0 z-20">
          <Header onSidebarToggle={handleSidebarToggle} />
        </div>
        {/* Nội dung chính */}
        <div className="mt-20 flex justify-center flex-1">
          <div className="w-full max-w-7xl p-4">{children}</div>
        </div>
      </div>
    </div>
  );
};
