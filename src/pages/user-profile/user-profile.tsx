import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import clsx from "clsx";
import { mockUserData } from "../../mock-data/mock-user-profile-data";
type UserProfileProps = {
  classes?: {
    [key: string]: string;
  };
};

// Các kiểu dữ liệu cho user profile
interface UserProfile {
  userId: string;
  personalInfo: {
    firstName: string;
    lastName: string;
    gender: string;
    birthdate: string;
    location: string;
    email: string;
    phone: string;
  };
  profileImages: {
    avatar: string;
    coverPhoto: string;
  };
  education: {
    schoolName: string;
    degree: string;
    yearGraduated: string;
  }[];
  workExperience: {
    companyName: string;
    position: string;
    years: string;
  }[];
  socialLinks: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
  };
  friends: {
    friendId: string;
    name: string;
    avatar: string;
  }[];
  posts: {
    postId: string;
    author: {
      name: string;
      avatar: string;
    };
    date: string;
    content: string;
    images: string[]; // nhiều ảnh
    likes: number;
    comments: {
      commentId: string;
      userId: string;
      userName: string;
      userAvatar: string;
      text: string;
      date: string;
    }[];
  }[];
  bio: string;
}

export const UserProfile: React.FC<UserProfileProps> = ({ classes }) => {
  const { id } = useParams<{ id: string }>();
  const [userData, setUserData] = useState<UserProfile | null>(null);

  if (!id) {
    return null;
  }

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        //  const response = await fetch(`/api/users/${id}`);
        //  const data: UserProfile = await response.json();
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
    <div className={clsx("p-4", classes?.userProfile)}>
      <div className={clsx("p-4", classes?.container)}>
        {/* Ảnh bìa và avatar */}
        <div className="relative">
          <img
            src={userData.profileImages.coverPhoto}
            alt="Cover"
            className="w-full h-64 object-cover rounded-lg"
          />
          <div className="absolute bottom-[-50px] left-4">
            <img
              src={userData.profileImages.avatar}
              alt="Avatar"
              className="w-24 h-24 rounded-full border-4 border-white shadow-lg"
            />
          </div>
        </div>

        {/* Thông tin cá nhân */}
        <div className="pt-14 text-center">
          <h1 className="text-2xl font-bold">
            {`${userData.personalInfo.firstName} ${userData.personalInfo.lastName}`}
          </h1>
          <p className="text-gray-600">{userData.bio}</p>
          <p className="text-gray-600">{userData.personalInfo.location}</p>
        </div>

        {/* Bài đăng */}
        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-2">Bài đăng</h2>
          {userData.posts.map((post) => (
            <div
              key={post.postId}
              className="card bg-base-100 shadow-md p-4 mb-4"
            >
              {/* Thông tin người đăng */}
              <div className="flex items-center mb-2">
                <img
                  src={post.author.avatar}
                  alt={post.author.name}
                  className="w-10 h-10 rounded-full mr-3"
                />
                <div>
                  <p className="font-semibold">{post.author.name}</p>
                  <p className="text-gray-500 text-sm">{post.date}</p>
                </div>
              </div>

              {/* Nội dung bài đăng */}
              <p>{post.content}</p>

              {/* Hình ảnh trong bài đăng */}
              {post.images.length > 0 && (
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {post.images.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`Post image ${index + 1}`}
                      className="w-full h-40 object-cover rounded-md"
                    />
                  ))}
                </div>
              )}

              {/* Số lượt thích */}
              <p className="text-gray-500 mt-2">👍 {post.likes} lượt thích</p>

              {/* Bình luận */}
              <div className="mt-4">
                <h3 className="font-semibold">Bình luận</h3>
                {post.comments.map((comment) => (
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
                      <p>{comment.text}</p>
                      <p className="text-gray-400 text-xs">{comment.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
