import React from "react";
import { Header } from "../components/header/header";
import { FaUsers, FaRegFileAlt } from "react-icons/fa"; // Import icon từ react-icons

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-1/6 bg-white text-gray-800 fixed top-0 left-0 bottom-0 p-4 z-10 shadow-md">
        {/* Avatar and User Info */}
        <div className="flex items-center space-x-4 mb-6 mt-20">
          <img
            src="https://via.placeholder.com/50" // Thay bằng URL avatar thực tế
            alt="User Avatar"
            className="w-12 h-12 rounded-full"
          />
          <div>
            <h2 className="text-lg font-semibold">Tên Người Dùng</h2>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col space-y-4">
          <button className="flex items-center space-x-2 p-4 text-gray-800 hover:bg-gray-200 rounded-md">
            <FaUsers size={20} />
            <span>Bạn bè</span>
          </button>
          <button className="flex items-center space-x-2 p-4 text-gray-800 hover:bg-gray-200 rounded-md">
            <FaRegFileAlt size={20} />
            <span>Nhóm</span>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col w-full ml-[20%]">
        <div className="bg-blue-600 text-white fixed top-0 left-0 right-0 z-20">
          <Header />
        </div>
        {/* Main Content */}
        <div className="mt-20 flex justify-center flex-1">
          <div className="w-full max-w-7xl p-4">{children}</div>
        </div>
      </div>

      {/* Footer */}
      {/* <div className="w-full bg-gray-800 text-white fixed bottom-0 p-4 z-10">
        <h2>Footer</h2>
      </div> */}
    </div>
  );
};
