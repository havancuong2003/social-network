import React, { useEffect, useRef, useState } from "react";
import {
  handleAddComment,
  handleFocusComment,
  handleReaction,
} from "../../../utils";
import { useNavigate } from "react-router-dom";
import { PostDetail } from "../../../pages";
import { PostType } from "../../../model/user-profile.model";

interface PostProps {
  postShow: PostType | null;
  handleUpdatePost: (updatedPost: PostType) => void;
}

export const Post: React.FC<PostProps> = ({ postShow, handleUpdatePost }) => {
  const [selectedReaction, setSelectedReaction] = useState<string | null>(null);
  const inputRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isOpen, setIsModalOpen] = useState(false); // State to manage modal visibility
  const navigate = useNavigate();
  const userId = localStorage.getItem("user");

  // Cập nhật trạng thái liked khi nhận được dữ liệu từ post
  useEffect(() => {
    if (postShow && userId) {
      const hasLiked = postShow.tymedBy?.some(
        (user) => user.toString() === userId
      );
      setSelectedReaction(hasLiked ? "❤️" : null);
    }
  }, [postShow, userId]);

  // Open modal logic
  const handleOpenModal = (index: number) => {
    setCurrentIndex(index);
    setIsModalOpen(true);
  };

  // Close modal logic
  const handleCloseModal = () => {
    setCurrentIndex(0);
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"; // Tắt cuộn trang khi modal mở
    } else {
      document.body.style.overflow = "auto"; // Bật lại cuộn trang khi modal đóng
    }

    return () => {
      document.body.style.overflow = "auto"; // Đảm bảo khi component bị unmount thì cuộn trang được bật lại
    };
  }, [isOpen]);

  return (
    <>
      <PostDetail
        isOpen={isOpen}
        handleClose={handleCloseModal}
        post={postShow}
        currentIndex={currentIndex}
        setCurrentIndex={setCurrentIndex}
        selectedReaction={selectedReaction}
        setSelectedReaction={setSelectedReaction}
        handleUpdatePost={handleUpdatePost}
      />
      <div className="card shadow-xl p-4 mb-8 lg:mb-14 border border-y-gray-300">
        {/* Thông tin người đăng */}
        <div className="flex items-center mb-2">
          <img
            src={postShow?.author.avatar}
            alt={postShow?.author.name}
            className="w-10 h-10 rounded-full mr-3 cursor-pointer"
            onClick={() => navigate(`/user/${postShow?.author.userId}`)}
            loading="lazy" // Lazy load
          />
          <div>
            <p
              className="font-semibold cursor-pointer"
              onClick={() => navigate(`/user/${postShow?.author.userId}`)}
            >
              {postShow?.author.name}{" "}
            </p>
            <p className="text-gray-500 text-sm ">
              <span
                className="hover:underline hover:text-black hover:cursor-pointer"
                onClick={() => handleOpenModal(0)} // Open modal instead of navigating
              >
                {postShow?.date}
              </span>
            </p>
          </div>
        </div>

        {/* Nội dung bài đăng */}
        <p dangerouslySetInnerHTML={{ __html: postShow?.content || "" }}></p>

        {/* Hình ảnh và video */}
        {postShow?.media && postShow.media.length > 0 && (
          <div className="grid grid-cols-2 gap-2 mt-2">
            {postShow.media.map((url, index) => {
              const isImage = url.match(/\.(jpeg|jpg|gif|png|webp|bmp)$/i); // Kiểm tra nếu là ảnh
              const isVideo = url.match(/\.(mp4|webm|ogg)$/i); // Kiểm tra nếu là video

              return (
                <div
                  key={index}
                  className="w-full h-40 rounded-md overflow-hidden"
                  onClick={() => handleOpenModal(index)} // Open modal instead of navigating
                >
                  {isImage ? (
                    <img
                      srcSet={`${url}?q_auto,f_auto,w_500`} // Tham số giảm chất lượng cho ảnh
                      src={`${url}?q_auto,f_auto,w_500`} // Cung cấp URL ảnh với chất lượng tự động và chiều rộng 500px
                      alt={`postShow media ${index + 1}`}
                      className="w-full h-full object-cover"
                      loading="lazy" // Lazy load giúp tải ảnh khi cần
                    />
                  ) : isVideo ? (
                    <video controls className="w-full h-full object-cover">
                      <source src={`${url}?quality=low`} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  ) : null}
                </div>
              );
            })}
          </div>
        )}

        {/* Phần tương tác */}
        <div className="flex items-center mt-4">
          {/* Nút Thích */}
          <button
            className={`px-8 py-2 rounded-md flex items-center space-x-2 border ${
              selectedReaction === "❤️"
                ? "text-red-700 bg-red-200"
                : "border-gray-500 bg-white"
            }`}
            onClick={() =>
              postShow &&
              userId &&
              handleReaction(
                selectedReaction,
                setSelectedReaction,
                "❤️",
                postShow,
                userId
              )
            }
          >
            {selectedReaction === "❤️" ? "❤️" : "🤍"}
          </button>

          {/* Nút Bình luận */}
          <button
            className="px-4 py-2 bg-gray-200 rounded-md border border-gray-500 ml-2"
            onClick={() => handleFocusComment(inputRef)}
          >
            💬 Bình luận
          </button>
        </div>

        {/* Danh sách bình luận */}
        <div className="mt-4">
          <h3 className="font-semibold">Bình luận</h3>
          {postShow?.comments.map((comment) => (
            <div
              key={comment._id}
              className="flex items-start space-x-2 border-t mt-2 pt-2 text-sm"
            >
              <img
                src={comment.userAvatar}
                alt={comment.userName}
                className="w-8 h-8 rounded-full"
              />
              <div>
                <p className="font-semibold">{comment.userName}</p>
                <p
                  dangerouslySetInnerHTML={{ __html: comment.text }} // Hiển thị nội dung với <br />
                ></p>
                <p className="text-gray-400 text-xs">{comment.date}</p>
              </div>
            </div>
          ))}

          {/* Thanh nhập bình luận */}
          <div className="flex items-center mt-4 space-x-2">
            <div
              ref={inputRef}
              className="w-full p-2 border rounded-md resize-none border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              contentEditable
              style={{
                height: "auto",
                minHeight: "40px",
              }}
            />
            <button
              onClick={() =>
                handleAddComment(inputRef, postShow, handleUpdatePost)
              }
              className="px-4 py-2 bg-blue-500 text-white rounded-md"
            >
              Gửi
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
