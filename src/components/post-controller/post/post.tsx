import React, { useEffect, useRef, useState } from "react";
import { useFetchPost } from "../../../hooks";
import {
  handleAddComment,
  handleFocusComment,
  handleReaction,
} from "../../../utils";
import { useNavigate } from "react-router-dom";
import { PostDetail } from "../../../pages";

interface PostProps {
  postId: string;
}

export const Post: React.FC<PostProps> = ({ postId }) => {
  const [selectedReaction, setSelectedReaction] = useState<string | null>(null);
  const inputRef = useRef<HTMLDivElement>(null);
  const { post, error, setPost } = useFetchPost(postId);
  const [isOpen, setIsModalOpen] = useState(false); // State to manage modal visibility

  if (error) return <div>Error: {error}</div>;

  const navigate = useNavigate();

  // Open modal logic
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  // Close modal logic
  const handleCloseModal = () => {
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
      <PostDetail isOpen={isOpen} handleClose={handleCloseModal} id={postId} />
      <div className="card shadow-xl p-4 mb-8 lg:mb-14 border border-y-gray-300">
        {/* Thông tin người đăng */}
        <div className="flex items-center mb-2">
          <img
            src={post?.author.avatar}
            alt={post?.author.name}
            className="w-10 h-10 rounded-full mr-3 cursor-pointer"
            onClick={() => navigate(`/user/${post?.author.userId}`)}
            loading="lazy" // Lazy load
          />
          <div>
            <p
              className="font-semibold cursor-pointer"
              onClick={() => navigate(`/user/${post?.author.userId}`)}
            >
              {post?.author.name}{" "}
            </p>
            <p className="text-gray-500 text-sm ">
              <span
                className="hover:underline hover:text-black hover:cursor-pointer"
                onClick={handleOpenModal} // Open modal instead of navigating
              >
                {post?.date}
              </span>
            </p>
          </div>
        </div>

        {/* Nội dung bài đăng */}
        <p>{post?.content}</p>

        {/* Hình ảnh và video */}
        {post?.media && post.media.length > 0 && (
          <div className="grid grid-cols-2 gap-2 mt-2">
            {post.media.map((url, index) => {
              const isImage = url.match(/\.(jpeg|jpg|gif|png|webp|bmp)$/i); // Kiểm tra nếu là ảnh
              const isVideo = url.match(/\.(mp4|webm|ogg)$/i); // Kiểm tra nếu là video

              return (
                <div
                  key={index}
                  className="w-full h-40 rounded-md overflow-hidden"
                  onClick={handleOpenModal} // Open modal instead of navigating
                >
                  {isImage ? (
                    <img
                      srcSet={`${url}?q_auto,f_auto,w_500`} // Tham số giảm chất lượng cho ảnh
                      src={`${url}?q_auto,f_auto,w_500`} // Cung cấp URL ảnh với chất lượng tự động và chiều rộng 500px
                      alt={`Post media ${index + 1}`}
                      className="w-full h-full object-cover"
                      loading="lazy" // Lazy load giúp tải ảnh khi cần
                      onLoad={() =>
                        console.log(
                          "Image loaded with URL:",
                          `${url}?q_auto,f_auto,w_500`
                        )
                      } // Log URL hình ảnh khi tải xong
                      onError={() => console.log("Failed to load image:", url)} // Log khi có lỗi tải hình ảnh
                    />
                  ) : isVideo ? (
                    <video
                      controls
                      className="w-full h-full object-cover"
                      onLoadedData={() =>
                        console.log(
                          "Video loaded with URL:",
                          `${url}?quality=low`
                        )
                      } // Log URL video khi tải xong
                      onError={() => console.log("Failed to load video:", url)} // Log khi có lỗi tải video
                    >
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
              handleReaction(selectedReaction, setSelectedReaction, "❤️")
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
          {post?.comments.map((comment) => (
            <div
              key={comment.commentId}
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
              onClick={() => handleAddComment(inputRef, post, setPost)}
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
