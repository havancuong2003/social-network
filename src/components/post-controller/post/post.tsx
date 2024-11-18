// src/components/Post.tsx
import React, { useEffect, useState } from "react";
import { PostType } from "../../../model/user-profile.model";
import { mockPostData } from "../../../mock-data/mock-post-data";

interface PostProps {
  postId: string;
}

export const Post: React.FC<PostProps> = ({ postId }) => {
  const [post, setPost] = useState<PostType | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        // Giả lập fetch từ dữ liệu mock
        const dataMock = mockPostData;
        const postById = dataMock.find((post) => post.postId === postId);
        if (!postById) {
          throw new Error("Post not found");
        }
        setPost(postById);
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };
    fetchPost();
  }, [postId]); // Thêm postId vào dependency array để fetch lại khi postId thay đổi

  if (!post) {
    return <div>Loading...</div>; // Hiển thị loading khi post chưa được lấy xong
  }

  return (
    <div key={postId} className="card bg-base-100 shadow-md p-4 mb-4">
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
  );
};
