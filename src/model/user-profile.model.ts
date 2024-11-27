// Hình ảnh hồ sơ
export interface ProfileImages {
  avatar: string; // URL tới ảnh đại diện
  coverPhoto: string; // URL tới ảnh bìa
}

// Bình luận trên bài đăng
export interface Comment {
  _id: string;
  userId: string;
  text: string;
  date: string; // ISO format: YYYY-MM-DD
}

// Hồ sơ người dùng chính

export interface PostType {
  postId: string; // ID bài viết
  author: {
    userId: string; // ID tác giả
    name: string; // Tên tác giả
    avatar: string; // Ảnh đại diện tác giả
  };
  date: string; // Thời gian đăng bài
  content: string; // Nội dung bài viết
  media: string[]; // Danh sách ảnh trong bài viết
  likes: number; // Số lượt thích
  tymedBy: string[]; // Danh sách userId của những người đã thích bài viết
  comments: CommentType[]; // Danh sách bình luận
}

export interface CommentType {
  _id: string; // ID bình luận
  userId: string; // ID người bình luận
  userName: string; // Tên người bình luận
  userAvatar: string; // Ảnh đại diện người bình luận
  text: string; // Nội dung bình luận
  date: string; // Thời gian bình luận
  replies?: ReplyType[]; // Danh sách phản hồi (nếu có)
}
export interface ReplyType {
  replyId: string; // ID phản hồi
  userId: string; // ID người phản hồi
  userName: string; // Tên người phản hồi
  userAvatar: string; // Ảnh đại diện người phản hồi
  text: string; // Nội dung phản hồi
  date: string; // Thời gian phản hồi
}

export interface UserType {
  _id: string;
  email: string;
  password: string;
  fullName: string;
  userName: string;
  gender: "male" | "female";
  profilePic?: string;
  biography?: string;
  coverPic?: string;
  birthday?: Date | null;
  location?: string;
  relationship?: string;
  phone?: string;
  website?: string;
  education?: string;
  work?: string;
  socialLinks?: string[];
  friends?: string[]; // Dùng ObjectId dưới dạng string
  createdAt?: Date;
  updatedAt?: Date;
  posts?: PostType[];
}
