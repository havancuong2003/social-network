import React, { useEffect } from "react";
import { Header } from "../components/header/header";
import { SideBar } from "../components";
import clsx from "clsx";

interface LayoutProps {
  children: React.ReactNode;
  classes?: {
    [key: string]: string;
  };
}

export const Layout = ({ children, classes }: LayoutProps) => {
  // Trạng thái mở/đóng Sidebar
  const [isSidebarOpen, setSidebarOpen] = React.useState(false);

  // Hàm toggle Sidebar
  const handleSidebarToggle = () => setSidebarOpen((prev) => !prev);

  // Cập nhật isSidebarOpen khi kích thước màn hình thay đổi
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setSidebarOpen(false); // Đảm bảo sidebar luôn đóng trên màn hình lớn
      }
    };

    // Lắng nghe sự thay đổi kích thước màn hình
    window.addEventListener("resize", handleResize);

    // Gọi một lần khi component mount để kiểm tra kích thước ban đầu
    handleResize();

    // Dọn dẹp sự kiện khi component unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <SideBar isOpen={isSidebarOpen} />

      {/* Nội dung */}
      <div className="flex flex-col w-full ">
        {/* Header */}
        <div className="bg-blue-600 text-white fixed top-0 left-0 right-0 z-20">
          <Header
            onSidebarToggle={handleSidebarToggle}
            isOpen={isSidebarOpen}
          />
        </div>
        {/* Nội dung chính */}
        <div className="mt-20 flex justify-center">
          <div className={clsx(classes?.container)}>{children}</div>
        </div>
      </div>
    </div>
  );
};
