import { useNavigate } from "react-router-dom";
import { useFetchPost } from "../../hooks";
import { useRef, useState } from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { handleAddComment } from "../../utils";
import CloseIcon from "@mui/icons-material/Close";
import clsx from "clsx";
type PostDetailProps = {
  classes?: {
    [key: string]: string;
  };
  handleClose: () => void;
  id: string;
  isOpen?: boolean;
};

export const PostDetail: React.FC<PostDetailProps> = ({
  classes,
  handleClose,
  id,
  isOpen,
}) => {
  const { post, error, setPost } = useFetchPost(id); // Sử dụng hook lấy post và error
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  console.log("check currentImageIndex", currentImageIndex);
  const videoRef = useRef<HTMLVideoElement>(null);

  const inputRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const handleNextImage = () => {
    if (post && post.media.length > 0) {
      setCurrentImageIndex((prevIndex) =>
        prevIndex < post.media.length - 1 ? prevIndex + 1 : prevIndex
      );
    }
  };

  const handlePrevImage = () => {
    if (post && post.media.length > 0) {
      setCurrentImageIndex((prevIndex) =>
        prevIndex > 0 ? prevIndex - 1 : prevIndex
      );
    }
  };

  return (
    <>
      {isOpen && (
        <div className={clsx(classes?.modal_post_detail)}>
          <div className="lg:grid lg:grid-cols-4  h-screen">
            {/* Phần 3/4 màn hình bên trái (Ảnh/video) */}
            <div className="max-w-full h-[calc(60vh)] lg:h-full lg:col-span-3 bg-black flex flex-col items-center justify-center overflow-hidden relative">
              {post && post.media.length > 0 ? (
                <>
                  {console.log("check post", post.media[currentImageIndex])}

                  {/* Kiểm tra media là ảnh hay video */}
                  {post.media[currentImageIndex].match(
                    /\.(jpeg|jpg|gif|png)$/i
                  ) ? (
                    <img
                      src={post.media[currentImageIndex]} // Hiển thị ảnh theo index
                      alt="Post media"
                      className="max-w-full max-h-screen object-contain"
                    />
                  ) : post.media[currentImageIndex].match(/\.(mp4|webm)$/i) ? (
                    <video
                      ref={videoRef}
                      key={currentImageIndex} // Thêm key để React tái tạo lại video khi chỉ số thay đổi
                      controls
                      className="max-w-full h-full object-contain"
                      autoPlay={true} // Nếu bạn muốn tự động phát video khi được chọn
                    >
                      <source
                        src={post.media[currentImageIndex]} // Loại bỏ tham số ?v= để tránh tải lại video không cần thiết
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
                      currentImageIndex === 0 ? "hidden" : ""
                    }`} // Ẩn nút khi ở ảnh/video đầu tiên
                  >
                    <ArrowBackIosIcon />
                  </button>

                  <button
                    onClick={handleNextImage}
                    className={`text-white bg-gray-500 active:bg-gray-600 bg-opacity-40 lg:hover:bg-white p-1 lg:p-4 lg:hover:text-black lg:active:bg-gray-400 lg:active:text-black rounded-full absolute top-1/2 right-4 transform -translate-y-1/2 ${
                      currentImageIndex === post.media.length - 1
                        ? "hidden"
                        : ""
                    }`} // Ẩn nút khi ở ảnh/video cuối cùng
                  >
                    <ArrowForwardIosIcon />
                  </button>

                  <button
                    onClick={handleClose}
                    className="text-white bg-black hover:bg-white p-2 hover:text-black active:bg-white active:text-black rounded-full absolute top-10 left-4 transform -translate-y-1/2"
                  >
                    <CloseIcon style={{ fontSize: "30px" }} />
                  </button>
                </>
              ) : (
                <p>No media available</p> // Nếu không có media
              )}
            </div>

            {/* Phần 1/4 màn hình bên phải (Content và Bình luận) */}
            <div className="lg:col-span-1 bg-white p-4 shadow-lg  overflow-y-auto">
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
                    <p className="text-gray-600 mb-4">{post.content}</p>
                  </div>
                ) : (
                  <p>Loading post content...</p>
                )}
                {error && <p className="text-red-500">{error}</p>}
              </div>

              {/* Tương tác */}
              <div className="flex flex-col">
                <button className="px-4 py-2 bg-red-500 text-white rounded-md mb-4">
                  ❤️ Thích
                </button>
                <div>
                  <h3 className="font-semibold mb-2">Bình luận</h3>
                  {post?.comments.map((comment) => (
                    <div
                      key={comment.commentId}
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
                    onClick={() => handleAddComment(inputRef, post, setPost)} // Wrap function in an anonymous function
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
