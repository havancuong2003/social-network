import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { handleAddComment, handleReaction } from "../../utils";
import CloseIcon from "@mui/icons-material/Close";
import clsx from "clsx";
import { PostType } from "../../model/user-profile.model";

type PostDetailProps = {
  classes?: {
    [key: string]: string;
  };
  handleClose: () => void;
  post: PostType | null;
  isOpen?: boolean;
  handleUpdatePost: (updatedPost: PostType) => void;
  currentIndex: number;
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
  selectedReaction: string | null;
  setSelectedReaction: React.Dispatch<React.SetStateAction<string | null>>;
};

export const PostDetail: React.FC<PostDetailProps> = ({
  classes,
  handleClose,
  post,
  isOpen,
  handleUpdatePost,
  currentIndex,
  setCurrentIndex,
  selectedReaction,
  setSelectedReaction,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const inputRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const handleNextImage = () => {
    if (post && post.media.length > 0) {
      setCurrentIndex((prevIndex) =>
        prevIndex < post.media.length - 1 ? prevIndex + 1 : prevIndex
      );
    }
  };

  const handlePrevImage = () => {
    if (post && post.media.length > 0) {
      setCurrentIndex((prevIndex) =>
        prevIndex > 0 ? prevIndex - 1 : prevIndex
      );
    }
  };

  const userId = localStorage.getItem("user");

  return (
    <>
      {isOpen && (
        <div className={clsx(classes?.modal_post_detail)}>
          <div className="lg:grid lg:grid-cols-4 h-screen">
            <div
              className={`max-w-full h-[calc(60vh)] lg:h-full bg-black flex flex-col items-center justify-center overflow-hidden relative ${
                !post?.media || post.media.length === 0
                  ? "hidden" // Chiếm 2/4 và căn giữa
                  : "lg:col-span-3" // Giữ nguyên 3/4 nếu có media
              }`}
            >
              {post && post.media.length > 0 && (
                <>
                  {post.media[currentIndex].match(/\.(jpeg|jpg|gif|png)$/i) ? (
                    <img
                      src={post.media[currentIndex]} // Hiển thị ảnh theo index
                      alt="Post media"
                      className="max-w-full max-h-screen object-contain"
                    />
                  ) : post.media[currentIndex].match(/\.(mp4|webm)$/i) ? (
                    <video
                      ref={videoRef}
                      key={currentIndex} // Thêm key để React tái tạo lại video khi chỉ số thay đổi
                      controls
                      className="max-w-full h-full object-contain"
                    >
                      <source
                        src={post.media[currentIndex]} // Loại bỏ tham số ?v= để tránh tải lại video không cần thiết
                        type="video/mp4"
                      />
                      Your browser does not support the video tag.
                    </video>
                  ) : (
                    <p>Unsupported media type</p> // Thông báo nếu không phải ảnh hay video
                  )}

                  {/* Nút điều hướng ảnh/video */}
                  <button
                    onClick={handlePrevImage}
                    className={`text-white bg-gray-500 active:bg-gray-600 bg-opacity-40 lg:hover:bg-white p-1 lg:p-4 lg:hover:text-black lg:active:bg-gray-400 lg:active:text-black rounded-full absolute top-1/2 left-4 transform -translate-y-1/2 ${
                      currentIndex === 0 ? "hidden" : ""
                    }`} // Ẩn nút khi ở ảnh/video đầu tiên
                  >
                    <ArrowBackIosIcon />
                  </button>

                  <button
                    onClick={handleNextImage}
                    className={`text-white bg-gray-500 active:bg-gray-600 bg-opacity-40 lg:hover:bg-white p-1 lg:p-4 lg:hover:text-black lg:active:bg-gray-400 lg:active:text-black rounded-full absolute top-1/2 right-4 transform -translate-y-1/2 ${
                      currentIndex === post.media.length - 1 ? "hidden" : ""
                    }`} // Ẩn nút khi ở ảnh/video cuối cùng
                  >
                    <ArrowForwardIosIcon />
                  </button>
                </>
              )}
            </div>
            <button
              onClick={handleClose}
              className="text-white bg-black hover:bg-white p-2 hover:text-black active:bg-white active:text-black rounded-full absolute top-10 left-4 transform -translate-y-1/2"
            >
              <CloseIcon style={{ fontSize: "30px" }} />
            </button>
            {/* Phần 1/4 màn hình bên phải (Content và Bình luận) */}
            <div
              className={`lg:col-span-1 bg-white p-4 shadow-lg overflow-y-auto ${
                !post?.media || post.media.length === 0
                  ? "lg:col-span-2 lg:col-start-2  h-[calc(80vh)] mt-[10%] rounded-lg" // Chiếm 2 cột và căn giữa
                  : ""
              }`}
            >
              {/* Nội dung bài viết */}
              <div>
                {post ? (
                  <div>
                    <div className="flex items-center mb-2 ">
                      <img
                        src={post?.author.avatar}
                        alt={post?.author.name}
                        className="w-10 h-10 rounded-full mr-3 cursor-pointer"
                        onClick={() =>
                          navigate(`/user/${post?.author?.userId}`)
                        }
                      />
                      <p
                        className="font-semibold cursor-pointer"
                        onClick={() =>
                          navigate(`/user/${post?.author?.userId}`)
                        }
                      >
                        {post?.author.name}
                      </p>
                    </div>
                    <p className="text-gray-500 text-sm">{post?.date}</p>
                    <p
                      className="text-gray-600 mb-4 break-words"
                      dangerouslySetInnerHTML={{ __html: post.content || "" }}
                    ></p>
                  </div>
                ) : (
                  <p>Loading post content...</p>
                )}
              </div>

              {/* Tương tác */}
              <div className="flex flex-col">
                <button
                  className={`px-4 py-2 rounded-md  ${
                    selectedReaction === "❤️"
                      ? "text-red-700 bg-red-200"
                      : "border-gray-500 bg-gray-400"
                  }`}
                  onClick={() =>
                    post &&
                    userId &&
                    handleReaction(
                      selectedReaction,
                      setSelectedReaction,
                      "❤️",
                      post,
                      userId
                    )
                  }
                >
                  <span className="text-xl">
                    {selectedReaction === "❤️" ? "❤️" : "🤍"}
                  </span>
                </button>
                <div>
                  <h3 className="font-semibold mb-2">Bình luận</h3>
                  {post?.comments.map((comment) => (
                    <div
                      key={comment._id}
                      className="flex items-start space-x-2 border-t mt-2 pt-2 text-sm"
                    >
                      <img
                        src={comment.userAvatar}
                        alt={comment.userName}
                        className="w-8 h-8 rounded-full cursor-pointer"
                        onClick={() => navigate(`/user/${comment.userId}`)}
                      />
                      <div>
                        <p
                          className="font-semibold cursor-pointer"
                          onClick={() => navigate(`/user/${comment.userId}`)}
                        >
                          {comment.userName}
                        </p>
                        <p
                          dangerouslySetInnerHTML={{ __html: comment.text }} // Hiển thị nội dung với <br />
                        ></p>
                        <p className="text-gray-400 text-xs">{comment.date}</p>
                      </div>
                    </div>
                  ))}
                </div>

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
                    className="px-4 py-2 bg-blue-500 text-white rounded-md"
                    onClick={() =>
                      handleAddComment(inputRef, post, handleUpdatePost)
                    }
                  >
                    Gửi
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
