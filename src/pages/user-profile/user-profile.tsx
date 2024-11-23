import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import clsx from "clsx";
import { mockUserData } from "../../mock-data/mock-user-profile-data";
import { FaTimes } from "react-icons/fa";
import { Post, UploadPost } from "../../components"; // Import component Post
import { uploadPost } from "../../services/post.service";
import { set } from "ramda";

type UserProfileProps = {
  classes?: {
    [key: string]: string;
  };
};

type FileType = File; // Kiểu cho file

export const UserProfile: React.FC<UserProfileProps> = ({}) => {
  const { id } = useParams<{ id: string }>();
  const [userData, setUserData] = useState<any | null>(null);
  const [showAvatarModal, setShowAvatarModal] = useState(false);
  const [showCoverModal, setShowCoverModal] = useState(false);
  const [files, setFiles] = useState<FileType[]>([]);
  const [fileError, setFileError] = useState<string>("");
  const [textValue, setTextValue] = useState("");
  if (!id) {
    return null;
  }

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const mockdata = mockUserData;

        setUserData(mockdata);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [id]);

  // Effect to lock/unlock body scroll
  useEffect(() => {
    if (showAvatarModal || showCoverModal) {
      document.body.style.overflow = "hidden"; // Lock scroll
    } else {
      document.body.style.overflow = ""; // Unlock scroll
    }

    // Cleanup effect
    return () => {
      document.body.style.overflow = ""; // Ensure scroll is unlocked on component unmount
    };
  }, [showAvatarModal, showCoverModal]);

  if (!userData) {
    return <div className="text-center">Loading...</div>;
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.files);

    const selectedFiles = Array.from(e.target.files || []);
    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/jpg",
      "video/mp4",
      "video/mov",
    ];
    const invalidFiles = selectedFiles.filter(
      (file) => !allowedTypes.includes(file.type)
    );

    if (invalidFiles.length > 0) {
      setFileError(
        "Chỉ chấp nhận tệp hình ảnh (JPEG, PNG) và video (MP4, MOV)."
      );
    } else {
      setFileError("");
      setFiles(selectedFiles);
    }
  };

  const handlePostSubmit = async () => {
    const formData = new FormData();

    if (files && files.length > 0) {
      files.forEach((file) => formData.append("media", file)); // Append từng file vào FormData
    }

    formData.append("text", textValue); // Append text

    try {
      const response = await uploadPost(formData); // Gửi formData lên server
      console.log("response data", response);
    } catch (error) {
      console.error("Error during post submit:", error);
    }
  };

  return (
    <div className={clsx("")}>
      <div className={clsx("md:p-2 lg:p-4")}>
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
          {userData.posts.map((post: any) => (
            <Post key={post.postId} postId={post.postId} />
          ))}
        </div>
      </div>

      {/* Modal up post */}
      <UploadPost
        userData={userData}
        handleFileChange={handleFileChange}
        files={files}
        fileError={fileError}
        handlePostSubmit={handlePostSubmit}
        setTextValue={setTextValue}
        setFiles={setFiles}
        textValue={textValue}
      />

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
              src={userData?.profileImages.avatar}
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
              src={userData?.profileImages.coverPhoto}
              alt="Full-size Cover"
              className="max-w-full max-h-[calc(100vh-6rem)] object-contain rounded-lg"
            />
          </div>
        </div>
      )}
    </div>
  );
};
