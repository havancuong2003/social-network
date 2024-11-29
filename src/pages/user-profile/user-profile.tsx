import React, { useEffect, useState } from "react";
import clsx from "clsx";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaTiktok,
  FaTimes,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import { Posts, UploadPost } from "../../components"; // Import component Post
import { Link, useParams } from "react-router-dom";
import { getUserData } from "../../services/user.service";
import { UserType } from "../../model/user-profile.model";
import { useUserPosts } from "../../contexts/user-post.context";
import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { useAuth } from "../../contexts";

type UserProfileProps = {
  classes?: {
    [key: string]: string;
  };
};

export const UserProfile: React.FC<UserProfileProps> = ({ classes }) => {
  const [showAvatarModal, setShowAvatarModal] = useState(false);
  const [showCoverModal, setShowCoverModal] = useState(false);

  const [error, setError] = useState<string | null>(null);

  const [userData, setUserData] = useState<UserType>({} as UserType);
  const { id } = useParams();
  const { posts, setUserId, updatePost, resetPosts } = useUserPosts();
  const { user } = useAuth();

  useEffect(() => {
    if (id) {
      // Cập nhật trạng thái ở đây
      setUserId(id); // Hoặc bất kỳ cập nhật nào khác
    }
  }, [id]);

  useEffect(() => {
    resetPosts();
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!id) {
        console.error("Error: ID is undefined.");
        setError("ID is undefined.");
        return; // Hoặc xử lý trường hợp thiếu `id` tại đây
      }

      try {
        const userData = await getUserData(id); // `id` đã được xác định là string
        setUserData(userData); // Giả sử bạn lưu dữ liệu vào state
        setError(null);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError("Error fetching user data.");
      }
    };

    fetchUserData();
  }, [id]);

  // Effect to lock/unlock body scroll
  useEffect(() => {
    if (showAvatarModal || showCoverModal) {
      document.body.style.overflow = "hidden"; // Lock scroll
    } else {
      document.body.style.overflow = "auto"; // Unlock scroll
    }

    // Cleanup effect
    return () => {
      document.body.style.overflow = "auto"; // Ensure scroll is unlocked on component unmount
    };
  }, [showAvatarModal, showCoverModal]);
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" }); // Cuộn lên đầu trang khi component được render
  }, []); // Chỉ chạy một lần khi component mount

  if (!userData) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <>
      {error && <div className="text-red-500">{error}</div>}
      {!error && (
        <div className={clsx("w-full")}>
          <div className={clsx("md:p-2 lg:p-4")}>
            {/* Avatar and Cover Image */}
            <div className="relative">
              <img
                src={userData.coverPic}
                alt="Cover"
                className="w-full h-80 object-cover rounded-lg cursor-pointer active:opacity-80"
                onClick={() => setShowCoverModal(true)}
              />
              <div className="absolute bottom-[-50px] left-4">
                <img
                  src={userData.profilePic}
                  alt="Avatar"
                  className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-60 lg:h-60 rounded-full border-4 border-white shadow-lg cursor-pointer active:opacity-80"
                  onClick={() => setShowAvatarModal(true)} // Show avatar modal on click
                />
              </div>
            </div>
            <div className={clsx(classes?.containerUserProfile)}>
              <div className={clsx(classes?.infoPersonal)}>
                <Box
                  sx={{
                    p: 3,
                    borderRadius: 2,
                    boxShadow: 2,
                    backgroundColor: "#f9f9f9",
                    mt: 5,
                  }}
                >
                  {/* Thông tin cơ bản */}
                  <Typography variant="h6" gutterBottom>
                    Thông tin cá nhân
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    <strong>Giới tính:</strong>{" "}
                    {userData.gender === "male" ? "Nam" : "Nữ"}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    <strong>Ngày sinh:</strong>{" "}
                    {userData.birthday
                      ? new Date(userData.birthday).toLocaleDateString()
                      : "Chưa cập nhật"}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    <strong>Số điện thoại:</strong>{" "}
                    {userData.phone || "Không có"}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    <strong>Địa chỉ:</strong> {userData.location || "Không có"}
                  </Typography>

                  <Divider sx={{ my: 3 }} />

                  {/* Liên kết xã hội */}
                  <Typography variant="h6" gutterBottom>
                    Liên kết xã hội
                  </Typography>
                  {Object.keys(userData.socialLinks || {}).length > 0 ? (
                    <List>
                      {Object.entries(userData.socialLinks || {}).map(
                        ([platform, link], index) => {
                          if (!link) return null; // Nếu không có liên kết, bỏ qua

                          // Chọn icon tương ứng theo platform
                          let icon;
                          let iconColor;
                          switch (platform.toLowerCase()) {
                            case "facebook":
                              icon = <FaFacebook />;
                              iconColor = "#1877F2"; // Màu xanh Facebook
                              break;
                            case "instagram":
                              icon = <FaInstagram />;
                              iconColor = "#E4405F"; // Màu hồng Instagram
                              break;
                            case "linkedin":
                              icon = <FaLinkedin />;
                              iconColor = "#0077B5"; // Màu xanh LinkedIn
                              break;
                            case "twitter":
                              icon = <FaTwitter />;
                              iconColor = "#1DA1F2"; // Màu xanh Twitter
                              break;
                            case "tiktok":
                              icon = <FaTiktok />;
                              iconColor = "#000000"; // Màu đen TikTok
                              break;
                            case "youtube":
                              icon = <FaYoutube />;
                              iconColor = "#FF0000"; // Màu đỏ YouTube
                              break;
                            default:
                              icon = null;
                              iconColor = "#000000"; // Mặc định là màu đen
                          }

                          return (
                            <ListItem key={index} disableGutters>
                              <ListItemText
                                primary={
                                  <Link
                                    to={link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    color="primary"
                                    style={{
                                      display: "flex",
                                      alignItems: "center",
                                      textDecoration: "none", // Loại bỏ gạch dưới
                                      color: iconColor, // Màu sắc của liên kết
                                      fontWeight: "500", // Làm đậm chữ
                                      transition: "all 0.3s ease", // Hiệu ứng chuyển màu mượt mà
                                      filter: "brightness(1)", // Giữ màu gốc cho icon và văn bản
                                    }}
                                    onMouseEnter={(e) => {
                                      const target = e.target as HTMLElement; // Cast to HTMLElement
                                      target.style.filter = "brightness(0.8)"; // Làm tối màu khi hover
                                    }}
                                    onMouseLeave={(e) => {
                                      const target = e.target as HTMLElement; // Cast to HTMLElement
                                      target.style.filter = "brightness(1)"; // Quay lại màu gốc khi rời chuột
                                    }}
                                  >
                                    {icon && (
                                      <span style={{ marginRight: "8px" }}>
                                        {icon}
                                      </span>
                                    )}
                                    {platform}
                                  </Link>
                                }
                              />
                            </ListItem>
                          );
                        }
                      )}
                    </List>
                  ) : (
                    <Typography variant="body2" color="text.secondary">
                      Chưa có liên kết xã hội.
                    </Typography>
                  )}
                </Box>
              </div>
              <div className={clsx(classes?.postPersonal)}>
                {/* Personal Info */}
                <div className=" text-center">
                  {user?._id === id ? (
                    <div>
                      <span className="text-2xl font-bold ">
                        {userData.fullName}
                      </span>
                    </div>
                  ) : (
                    <div>
                      <p className="text-gray-600 mb-10">
                        Bạn đang xem hồ sơ của
                      </p>
                      <span className="text-2xl font-bold ">
                        {userData.fullName}
                      </span>
                    </div>
                  )}
                  <p className="text-gray-600">{userData.biography}</p>
                </div>
                {/* what are you thinking */}
                <div
                  className={`${
                    user?._id === id
                      ? "mt-10 border-t border-gray-300"
                      : "hidden"
                  }`}
                ></div>
                <div className="text-center my-10">
                  <div className={`${user?._id === id ? "flex" : "hidden"}`}>
                    <img
                      src={userData.profilePic}
                      alt="avatar"
                      className="w-16 h-16 rounded-full mr-3"
                    />
                    <label
                      htmlFor="my_modal_6"
                      className="flex items-center w-full hover:cursor-pointer hover:bg-gray-500 hover:text-white rounded-full bg-gray-300 py-2 px-4"
                    >
                      <span className="lg:ml-10">
                        Bạn đang nghĩ gì? Click vào đây để đăng trạng thái
                      </span>
                    </label>
                  </div>
                </div>
                <div className="mb-10 border-b border-gray-300"></div>
                <div>
                  <button className="mr-3 bg-gray-500 text-white hover:bg-gray-400 hover:text-black px-4 py-2 rounded-full">
                    Ảnh
                  </button>
                  <button className=" bg-gray-500 text-white hover:bg-gray-300 px-4 py-2 rounded-full">
                    Bạn bè
                  </button>
                </div>
                {/* User's Posts */}
                <div className="mt-6">
                  <h2 className="text-lg font-semibold mb-2">Bài đăng</h2>

                  <Posts posts={posts} updatePost={updatePost} />
                </div>
              </div>
            </div>
          </div>

          {/* Modal up post */}
          <UploadPost userData={userData} />

          {/* Avatar Modal */}
          {showAvatarModal && (
            <div
              className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
              onClick={() => setShowAvatarModal(false)}
            >
              <div
                className="bg-white rounded-lg overflow-hidden p-4 max-w-screen-lg max-h-screen-lg w-max-4/5 h-max-4/5 relative"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  className="absolute top-0 right-2 text-2xl hover:bg-gray-700 hover:text-white p-2 rounded-full"
                  onClick={() => setShowAvatarModal(false)}
                >
                  <FaTimes />
                </button>
                <img
                  src={userData?.profilePic}
                  alt="Full-size Avatar"
                  className="max-w-full max-h-[calc(100vh-6rem)] object-contain rounded-lg"
                />
              </div>
            </div>
          )}

          {/* Cover Modal */}
          {showCoverModal && (
            <div
              className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
              onClick={() => setShowCoverModal(false)}
            >
              <div
                className="bg-white rounded-lg overflow-hidden pt-8 px-4 lg:p-2 max-w-screen-lg max-h-screen-lg w-max-4/5 h-max-4/5 relative"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  className="absolute top-0 right-2 text-2xl hover:bg-gray-700 hover:text-white p-2 rounded-full"
                  onClick={() => setShowCoverModal(false)}
                >
                  <FaTimes />
                </button>
                <img
                  src={userData?.coverPic}
                  alt="Full-size Cover"
                  className="w-full h-[calc(100vh-6rem)] object-contain rounded-lg"
                />
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};
