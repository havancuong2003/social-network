import { useState, useEffect } from "react";
import HomeIcon from "@mui/icons-material/Home";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { usePosts } from "../../contexts";
import { useNavigate } from "react-router-dom";

export const Footer = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const navigate = useNavigate();
  const handleScroll = () => {
    if (window.scrollY > lastScrollY) {
      // Nếu cuộn xuống, ẩn footer
      setIsVisible(false);
    } else {
      // Nếu cuộn lên, hiển thị footer
      setIsVisible(true);
    }
    setLastScrollY(window.scrollY); // Cập nhật vị trí cuộn
  };

  useEffect(() => {
    // Thêm event listener khi component mount
    window.addEventListener("scroll", handleScroll);

    // Dọn dẹp event listener khi component unmount
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]); // Chạy lại effect khi lastScrollY thay đổi

  const { resetPosts } = usePosts(); // Lấy hàm resetPosts từ hook

  const handleHomeClick = () => {
    resetPosts(); // Gọi resetPosts khi bấm nút Home
    navigate("/");
  };
  return (
    <div
      className={` lg:hidden fixed bottom-0 left-0 right-0 bg-gray-200 text-white p-2 transition-transform duration-300 ${
        isVisible ? "transform translate-y-0" : "transform translate-y-full"
      }`}
    >
      <div className="flex justify-between items-center w-full max-w-screen-sm mx-auto">
        {/* Home Button */}
        {/* Home Button */}
        <div className="flex justify-center items-center w-1/4">
          <div onClick={handleHomeClick}>
            <HomeIcon fontSize="large" sx={{ color: "black" }} />
          </div>
        </div>

        {/* Friends Button */}
        <div className="flex justify-center items-center w-1/4">
          <div className="">
            <PeopleAltIcon fontSize="large" sx={{ color: "black" }} />
          </div>
        </div>

        {/* Notifications Button */}
        <div className="flex justify-center items-center w-1/4">
          <div className="">
            <NotificationsIcon fontSize="large" sx={{ color: "black" }} />
          </div>
        </div>

        {/* Avatar Button */}
        <div className="flex justify-center items-center w-1/4">
          <div className="border border-gray-400 rounded-full p-2">
            <img
              src="https://banner2.cleanpng.com/20240204/xro/transparent-goku-illustration-of-goku-from-dragon-ball-1710886648944.webp" // Avatar placeholder, có thể thay bằng URL thực
              alt="Avatar"
              className="rounded-full w-10 h-10"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
