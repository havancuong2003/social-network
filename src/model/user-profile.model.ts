export interface PersonalInfo {
  firstName: string;
  lastName: string;
  gender: "Male" | "Female" | "Other";
  birthdate: string; // ISO format: YYYY-MM-DD
  location: string;
  email: string;
  phone: string;
}

// Hình ảnh hồ sơ
export interface ProfileImages {
  avatar: string; // URL tới ảnh đại diện
  coverPhoto: string; // URL tới ảnh bìa
}

// Học vấn
export interface Education {
  schoolName: string;
  degree: string;
  yearGraduated: string;
}

// Kinh nghiệm làm việc
export interface WorkExperience {
  companyName: string;
  position: string;
  years: string; // e.g., "2015 - 2020"
}

// Liên kết mạng xã hội
export interface SocialLinks {
  facebook?: string;
  instagram?: string;
  twitter?: string;
}

// Bạn bè
export interface Friend {
  friendId: string;
  name: string;
  avatar: string; // URL tới ảnh đại diện bạn bè
}

// Bình luận trên bài đăng
export interface Comment {
  commentId: string;
  userId: string;
  text: string;
  date: string; // ISO format: YYYY-MM-DD
}

// Bài đăng
export interface Post {
  postId: string;
  date: string; // ISO format: YYYY-MM-DD
  content: string;
  image?: string; // URL tới ảnh đính kèm (nếu có)
  likes: number;
  comments: Comment[];
}

// Hồ sơ người dùng chính
export interface UserProfile {
  userId: string;
  personalInfo: PersonalInfo;
  profileImages: ProfileImages;
  education: Education[];
  workExperience: WorkExperience[];
  socialLinks: SocialLinks;
  friends: Friend[];
  posts: Post[];
  bio: string;
}

export interface PostType {
  postId: string;
  author: {
    name: string;
    avatar: string;
  };
  date: string;
  content: string;
  images: string[];
  likes: number;
  comments: {
    commentId: string;
    userId: string;
    userName: string;
    userAvatar: string;
    text: string;
    date: string;
  }[];
}
