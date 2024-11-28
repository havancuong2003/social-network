import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { FaTimes } from "react-icons/fa";
import { Posts, UploadPost } from "../../components"; // Import component Post
import { useParams } from "react-router-dom";
import { getUserData } from "../../services/user.service";
import { UserType } from "../../model/user-profile.model";
import { useUserPosts } from "../../contexts/user-post.context";

type UserProfileProps = {
  classes?: {
    [key: string]: string;
  };
};

export const UserProfile: React.FC<UserProfileProps> = ({}) => {
  const [showAvatarModal, setShowAvatarModal] = useState(false);
  const [showCoverModal, setShowCoverModal] = useState(false);

  const [error, setError] = useState<string | null>(null);

  const [userData, setUserData] = useState<UserType>({} as UserType);
  const { id } = useParams();
  const { posts, setUserId, updatePost } = useUserPosts();
  useEffect(() => {
    if (id) {
      // Cập nhật trạng thái ở đây
      setUserId(id); // Hoặc bất kỳ cập nhật nào khác
    }
  }, [id]);

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
        <div className={clsx("")}>
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
            {/* Personal Info */}
            <div className="pt-14 text-center">
              <h1 className="text-2xl font-bold">{`${userData.fullName}`}</h1>
              <p className="text-gray-600">{userData.biography}</p>
              <p className="text-gray-600">{userData.location}</p>
            </div>
            {/* what are you thinking */}
            <div className="mt-10 border-t border-gray-300"></div>
            <div className="text-center my-10">
              <div className="flex">
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
            {/* User's Posts */}
            <div className="mt-6">
              <h2 className="text-lg font-semibold mb-2">Bài đăng</h2>
              {/* {userData?.posts?.map((post: any) => (
                <Post key={post.postId} postId={post.postId} />
              ))} */}
              <Posts posts={posts} updatePost={updatePost} />
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
                  className="max-w-full max-h-[calc(100vh-6rem)] object-contain rounded-lg"
                />
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};
