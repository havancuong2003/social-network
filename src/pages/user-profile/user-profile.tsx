// src/components/UserProfile.tsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import clsx from "clsx";
import { mockUserData } from "../../mock-data/mock-user-profile-data";
import { FaTimes } from "react-icons/fa";
import { Post } from "../../components"; // Import component Post

type UserProfileProps = {
  classes?: {
    [key: string]: string;
  };
};

export const UserProfile: React.FC<UserProfileProps> = ({ classes }) => {
  const { id } = useParams<{ id: string }>();
  const [userData, setUserData] = useState<any | null>(null);
  const [showAvatarModal, setShowAvatarModal] = useState(false);
  const [showCoverModal, setShowCoverModal] = useState(false);

  if (!id) {
    return null;
  }

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Fetch user data from API
        const mockdata = mockUserData;
        setUserData(mockdata);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [id]);

  if (!userData) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <div className={clsx("", classes?.userProfile)}>
      <div className={clsx("md:p-2 lg:p-4", classes?.container)}>
        {/* Avatar and Cover Image */}
        <div className="relative">
          <img
            src={userData.profileImages.coverPhoto}
            alt="Cover"
            className="w-full h-80 object-cover rounded-lg cursor-pointer active:opacity-80"
            onClick={() => setShowCoverModal(true)}
          />
          <div className="absolute bottom-[-50px] left-4">
            <img
              src={userData.profileImages.avatar}
              alt="Avatar"
              className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-60 lg:h-60 rounded-full border-4 border-white shadow-lg cursor-pointer active:opacity-80"
              onClick={() => setShowAvatarModal(true)} // Show avatar modal on click
            />
          </div>
        </div>

        {/* Personal Info */}
        <div className="pt-14 text-center">
          <h1 className="text-2xl font-bold">
            {`${userData.personalInfo.firstName} ${userData.personalInfo.lastName}`}
          </h1>
          <p className="text-gray-600">{userData.bio}</p>
          <p className="text-gray-600">{userData.personalInfo.location}</p>
        </div>

        {/* what are you thinking */}
        <div className="mt-10 border-t border-gray-300"></div>

        <div className="text-center my-10">
          <div className="flex">
            <img
              src={userData.profileImages.avatar}
              alt="avatar"
              className="w-16 h-16 rounded-full mr-3"
            />
            <label
              htmlFor="my_modal_6"
              className="flex  items-center w-full hover:cursor-pointer hover:bg-gray-500 hover:text-white rounded-full bg-gray-300 py-2 px-4"
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
          {userData.posts.map((post: any) => (
            <Post
              key={post.postId}
              postId={post.postId}
              author={post.author}
              date={post.date}
              content={post.content}
              images={post.images}
              likes={post.likes}
              comments={post.comments}
            />
          ))}
        </div>
      </div>

      {/* Avatar Modal */}
      {showAvatarModal && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
          onClick={() => setShowAvatarModal(false)} // Close avatar modal on background click
        >
          <div
            className="bg-white rounded-lg overflow-hidden p-4 max-w-screen-lg max-h-screen-lg w-max-4/5 h-max-4/5 relative"
            onClick={(e) => e.stopPropagation()} // Prevent close on image click
          >
            <button
              className="absolute top-0 right-2 text-2xl hover:bg-gray-700 hover:text-white p-2 rounded-full"
              onClick={() => setShowAvatarModal(false)}
            >
              <FaTimes />
            </button>
            <img
              src={userData?.profileImages.avatar}
              alt="Full-size Avatar"
              className="w-full h-full object-contain rounded-lg"
            />
          </div>
        </div>
      )}

      {/* Cover Modal */}
      {showCoverModal && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
          onClick={() => setShowCoverModal(false)} // Close cover modal on background click
        >
          <div
            className="bg-white rounded-lg overflow-hidden pt-8 px-4 lg:p-8 max-w-screen-lg max-h-screen-lg w-max-4/5 h-max-4/5 relative"
            onClick={(e) => e.stopPropagation()} // Prevent close on image click
          >
            <button
              className="absolute top-0 right-2 text-2xl hover:bg-gray-700 hover:text-white p-2 rounded-full"
              onClick={() => setShowCoverModal(false)}
            >
              <FaTimes />
            </button>
            <img
              src={userData?.profileImages.coverPhoto}
              alt="Full-size Cover"
              className="w-full h-full object-contain rounded-lg"
            />
          </div>
        </div>
      )}
      {/* The button to open modal */}

      {/* Put this part before </body> tag */}
      <input type="checkbox" id="my_modal_6" className="modal-toggle" />
      <div className="modal" role="dialog">
        <div className="modal-box w-full sm:w-4/5 lg:max-w-4xl h-auto">
          {" "}
          {/* Responsive width và height tự động */}{" "}
          {/* Tăng chiều rộng của modal */}
          <h3 className="text-lg font-bold text-center">Tạo bài viết</h3>
          <div className="flex">
            <img
              src={userData?.profileImages.avatar}
              alt="avatar"
              className="w-16 h-16 rounded-full"
            />
            <h6 className="ml-4 font-bold">{`${userData.personalInfo.firstName} ${userData.personalInfo.lastName}`}</h6>
          </div>
          <div>
            <textarea
              className="textarea textarea-bordered w-full mt-4"
              placeholder="What's on your mind?"
              rows={8}
            ></textarea>
          </div>
          <div className="border-t border-gray-300 mt-10"></div>
          <div className="flex justify-between">
            <div className="mt-4">
              <p>Thêm vào bài viết của bạn</p>
            </div>
            <div>IMG, VIDEO</div>
          </div>
          <div className="border-b border-gray-300 mt-4"></div>
          <div className="modal-action">
            <label htmlFor="my_modal_6" className="btn">
              Close!
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};
