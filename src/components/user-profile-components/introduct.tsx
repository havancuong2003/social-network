import React from "react";
import { Posts } from "../post-controller";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaTiktok,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { PostType, UserType } from "../../model/user-profile.model";
import clsx from "clsx";
import { Link } from "react-router-dom";

interface IntroductProps {
  classes?: {
    [key: string]: string;
  };
  userData: UserType;
  user: UserType | null;
  id: string | undefined;
  posts: PostType[] | null;
  updatePost: (updatedPost: PostType) => void;
}

export const Introduct: React.FC<IntroductProps> = ({
  classes,
  userData,
  user,
  id,
  posts,
  updatePost,
}) => {
  return (
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
            <strong>Số điện thoại:</strong> {userData.phone || "Không có"}
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
                              <span style={{ marginRight: "8px" }}>{icon}</span>
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
              <span className="text-2xl font-bold ">{userData.fullName}</span>
            </div>
          ) : (
            <div>
              <p className="text-gray-600 mb-10">Bạn đang xem hồ sơ của</p>
              <span className="text-2xl font-bold ">{userData.fullName}</span>
            </div>
          )}
          <p className="text-gray-600">{userData.biography}</p>
        </div>

        {/* what are you thinking */}
        <div
          className={`${
            user?._id === id ? "mt-10 border-t border-gray-300" : "hidden"
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

        {/* User's Posts */}
        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-2">Bài đăng</h2>

          <Posts posts={posts} updatePost={updatePost} />
        </div>
      </div>
    </div>
  );
};
