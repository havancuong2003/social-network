import React, { useEffect } from "react";
import { FaRegFileAlt, FaUsers, FaCommentDots, FaCog } from "react-icons/fa";

interface SideBarProps {
  isOpen: boolean;
}

export const SideBar: React.FC<SideBarProps> = ({ isOpen }) => {
  const handleRedirect = () => {
    // Điều hướng đến URL ngoài ứng dụng
    window.location.href = "https://test-chat-frontend.vercel.app/";
  };

  // Đảm bảo khi sidebar mở, trang không cuộn trên mobile và có hiệu ứng mờ
  useEffect(() => {
    if (isOpen) {
      // Vô hiệu hóa cuộn khi sidebar mở
      document.body.style.overflow = "hidden";
    } else {
      // Khôi phục cuộn khi sidebar đóng
      document.body.style.overflow = "auto";
    }

    // Clean up khi component bị unmount hoặc isOpen thay đổi
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  return (
    <>
      {/* Lớp phủ mờ phía sau sidebar */}
      {isOpen && (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-black opacity-50 z-10"></div>
      )}

      <div
        className={`fixed top-0 left-0 bottom-0 md:p-4 z-20 shadow-md transition-all duration-300
        ${isOpen ? "w-64" : "w-0"} 
        md:block md:w-64 bg-white text-gray-800 overflow-hidden`}
      >
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

        <div className="flex flex-col space-y-4">
          <button className="flex items-center space-x-2 p-4 text-gray-800 hover:bg-gray-200 rounded-md">
            <FaUsers size={20} />
            <span>Bạn bè</span>
          </button>
          <button className="flex items-center space-x-2 p-4 text-gray-800 hover:bg-gray-200 rounded-md">
            <FaRegFileAlt size={20} />
            <span>Nhóm</span>
          </button>
          <button
            className="flex items-center space-x-2 p-4 text-gray-800 hover:bg-gray-200 rounded-md"
            onClick={handleRedirect}
          >
            <FaCommentDots size={20} />
            <span>Tin nhắn</span>
          </button>
          <button className="flex items-center space-x-2 p-4 text-gray-800 hover:bg-gray-200 rounded-md">
            <FaCog size={20} />
            <span>Cài đặt</span>
          </button>
        </div>
      </div>
    </>
  );
};
