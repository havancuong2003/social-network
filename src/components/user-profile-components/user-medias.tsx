import { useEffect, useState } from "react";
import { useAuth, useUserMedia } from "../../contexts";
import { PostType, UserType } from "../../model/user-profile.model";
import { PostDetail } from "../../pages";

interface UserMediasProps {
  classes?: {
    [key: string]: string;
  };
  userData: UserType | null;
  id: string | undefined;
}

export const UserMedias: React.FC<UserMediasProps> = ({}) => {
  const { medias, updatePostMedia, loading, resetMedia } = useUserMedia();
  const [selectedPost, setSelectedPost] = useState<PostType | null>(null); // State lưu post được chọn
  const [isOpen, setIsOpen] = useState(false); // Trạng thái mở/đóng PostDetail
  const [currentIndex, setCurrentIndex] = useState<number>(0); // Chỉ mục của ảnh/video hiện tại trong bài post
  const [selectedReaction, setSelectedReaction] = useState<string | null>(null);
  const { user } = useAuth();
  useEffect(() => {
    resetMedia();
  }, []);
  const handleMediaClick = (post: PostType, index: number) => {
    setSelectedPost(post); // Lưu bài post được chọn
    setCurrentIndex(index); // Lưu chỉ mục của ảnh/video được chọn
    setIsOpen(true); // Mở PostDetail
    console.log("index", post);
    console.log("check user", user);
    setSelectedReaction(
      post.tymedBy.some((userTym) => userTym._id === user?._id) ? "❤️" : null
    );
  };

  const handleClosePost = () => {
    setSelectedPost(null); // Xóa bài post được chọn
    setIsOpen(false); // Đóng PostDetail
  };

  const handleNext = () => {
    if (selectedPost) {
      const nextIndex = (currentIndex + 1) % selectedPost.media.length;
      setCurrentIndex(nextIndex); // Chuyển đến ảnh/video tiếp theo
    }
  };

  const handlePrevious = () => {
    if (selectedPost) {
      const prevIndex =
        (currentIndex - 1 + selectedPost.media.length) %
        selectedPost.media.length;
      setCurrentIndex(prevIndex); // Quay lại ảnh/video trước đó
    }
  };

  return (
    <>
      {isOpen && selectedPost ? ( // Kiểm tra trạng thái mở và bài post
        <PostDetail
          post={selectedPost}
          handleClose={handleClosePost}
          isOpen={isOpen}
          handleUpdatePost={updatePostMedia}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
          selectedReaction={selectedReaction}
          setSelectedReaction={setSelectedReaction}
          handleNext={handleNext} // Thêm hàm chuyển tới ảnh/video tiếp theo
          handlePrevious={handlePrevious} // Thêm hàm quay lại ảnh/video trước đó
        />
      ) : (
        <div className="grid p-2 lg:p-0 grid-cols-3 md:grid-cols-6 gap-4 my-10">
          {medias.flatMap((item) =>
            item.mediaShow.map((media, index) => {
              const isVideo =
                media.endsWith(".mp4") ||
                media.endsWith(".webm") ||
                media.endsWith(".ogg");

              return (
                <div
                  key={`${item.post.postId}-${media}`}
                  className="overflow-hidden rounded-lg bg-gray-100 cursor-pointer"
                  onClick={() => handleMediaClick(item.post, index)} // Xử lý click và truyền chỉ mục
                >
                  {isVideo ? (
                    <video
                      src={media}
                      controls
                      className="w-full h-[150px] object-cover md:h-[250px]"
                    ></video>
                  ) : (
                    <img
                      src={media}
                      alt=""
                      className="w-full h-[150px] object-cover md:h-[250px]"
                    />
                  )}
                </div>
              );
            })
          )}
        </div>
      )}
    </>
  );
};
