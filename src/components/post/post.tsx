// src/components/Post.tsx
import React from "react";

interface PostProps {
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

export const Post: React.FC<PostProps> = ({
  postId,
  author,
  date,
  content,
  images,
  likes,
  comments,
}) => {
  return (
    <div key={postId} className="card bg-base-100 shadow-md p-4 mb-4">
      {/* Thông tin người đăng */}
      <div className="flex items-center mb-2">
        <img
          src={author.avatar}
          alt={author.name}
          className="w-10 h-10 rounded-full mr-3"
        />
        <div>
          <p className="font-semibold">{author.name}</p>
          <p className="text-gray-500 text-sm">{date}</p>
        </div>
      </div>

      {/* Nội dung bài đăng */}
      <p>{content}</p>

      {/* Hình ảnh trong bài đăng */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 gap-2 mt-2">
          {images.map((image, index) => (
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
      <p className="text-gray-500 mt-2">👍 {likes} lượt thích</p>

      {/* Bình luận */}
      <div className="mt-4">
        <h3 className="font-semibold">Bình luận</h3>
        {comments.map((comment) => (
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
  );
};
