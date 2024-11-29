import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { FaTimes } from "react-icons/fa";
import {
  Introduct,
  UploadPost,
  UserFriends,
  UserMedias,
} from "../../components";
import { useParams } from "react-router-dom";
import { getUserData } from "../../services/user.service";
import { UserType } from "../../model/user-profile.model";
import { useUserPosts } from "../../contexts/user-post.context";
import { Tabs, Tab, Box } from "@mui/material";
import { useAuth } from "../../contexts";

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
  const { posts, updatePost, resetPosts } = useUserPosts();
  // const { setUserMediaId } = useUserMedia();
  const { user, setUserIdProfile } = useAuth();

  const [selectedTab, setSelectedTab] = useState(0); // 0: Giới thiệu, 1: Ảnh và video, 2: Bạn bè

  useEffect(() => {
    if (id) {
      setUserIdProfile(id);
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
        return;
      }

      try {
        const userData = await getUserData(id);
        setUserData(userData);
        setError(null);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError("Error fetching user data.");
      }
    };

    fetchUserData();
  }, [id]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    event.preventDefault();
    setSelectedTab(newValue); // Chuyển tab khi người dùng click
  };

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
                  className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-60 lg:h-60 rounded-full border-4 border-white shadow-lg cursor-pointer active:opacity-80 relative"
                  onClick={() => setShowAvatarModal(true)}
                />
              </div>
            </div>
            <div className=" text-center mt-10">
              {user?._id === id ? (
                <div>
                  <span className="text-2xl font-bold ">
                    {userData.fullName}
                  </span>
                </div>
              ) : (
                <div>
                  <p className="text-gray-600 mb-10">Bạn đang xem hồ sơ của</p>
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
                user?._id === id ? "mt-2 border-t border-gray-300" : "hidden"
              }`}
            ></div>
            {/* Tabs for navigation */}
            <Box sx={{ width: "100%", marginTop: "70px" }}>
              <Tabs
                value={selectedTab}
                onChange={handleTabChange}
                aria-label="User profile tabs"
                indicatorColor="primary"
                textColor="primary"
              >
                <Tab
                  label="Giới thiệu"
                  sx={{
                    fontSize: "1rem",
                    fontWeight: "bold",
                    fontFamily: "sans-serif",
                  }}
                />
                <Tab
                  label="Ảnh và video"
                  sx={{
                    fontSize: "1rem",
                    fontWeight: "bold",
                    fontFamily: "sans-serif",
                  }}
                />
                <Tab
                  label="Bạn bè"
                  sx={{
                    fontSize: "1rem",
                    fontWeight: "bold",
                    fontFamily: "sans-serif",
                  }}
                />
              </Tabs>
            </Box>

            {/* Display content based on selected tab */}
            {selectedTab === 0 && (
              <Introduct
                userData={userData}
                user={user}
                id={id}
                posts={posts}
                updatePost={updatePost}
              />
            )}
            {selectedTab === 1 && <UserMedias userData={userData} id={id} />}
            {selectedTab === 2 && <UserFriends userData={userData} id={id} />}

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
        </div>
      )}
    </>
  );
};
