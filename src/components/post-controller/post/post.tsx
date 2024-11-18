import React, { useEffect, useState } from "react";
import { PostType } from "../../../model/user-profile.model";
import { mockPostData } from "../../../mock-data/mock-post-data";

interface PostProps {
  postId: string;
}

export const Post: React.FC<PostProps> = ({ postId }) => {
  const [post, setPost] = useState<PostType | null>(null);
  const [newComment, setNewComment] = useState(""); // State cho nội dung bình luận mới
  const [selectedReaction, setSelectedReaction] = useState<string | null>(null); // Biểu cảm đã chọn

  useEffect(() => {
    const fetchPost = async () => {
      try {
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
  }, [postId]);

  if (!post) {
    return <div>Loading...</div>;
  }

  const handleAddComment = () => {
    if (newComment.trim()) {
      const newCommentObj = {
        commentId: String(Math.random()),
        userId: "currentUserId", // Thay bằng ID user thực tế
        userName: "Bạn",
        userAvatar: "/default-avatar.png", // Đổi thành avatar của user
        text: newComment,
        date: new Date().toLocaleString(),
      };

      setPost((prevPost) =>
        prevPost
          ? {
              ...prevPost,
              comments: [...prevPost.comments, newCommentObj],
            }
          : null
      );

      setNewComment("");
    }
  };

  const handleReaction = (reaction: string) => {
    setSelectedReaction(reaction);
    console.log("Reaction selected:", reaction);
  };

  return (
    <div
      key={postId}
      className="card shadow-xl p-4 mb-8 lg:mb-14 border border-y-gray-300"
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

      {/* Hình ảnh */}
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

      {/* Phần tương tác */}
      <div className="flex items-center mt-4 space-x-4">
        {/* Like với biểu cảm */}
        <div className="relative group">
          <button className="px-4 py-2 bg-gray-200 rounded-md flex items-center space-x-2">
            👍 {selectedReaction || "Like"}
          </button>
          <div className="absolute hidden group-hover:flex flex-row space-x-2 bg-white border shadow-md p-2 rounded-md top-full left-0 mt-2">
            {[
              "👍 Thích",
              "❤️ Yêu Thích",
              "😂 Haha",
              "😡 Tức Giận",
              "😢 Buồn",
            ].map((reaction, index) => (
              <button
                key={index}
                onClick={() => handleReaction(reaction)}
                className="p-1 hover:bg-gray-100 rounded-md"
              >
                {reaction.split(" ")[0]}
              </button>
            ))}
          </div>
        </div>

        {/* Nút bình luận */}
        <button className="px-4 py-2 bg-gray-200 rounded-md">
          💬 Bình luận
        </button>
      </div>

      {/* Danh sách bình luận */}
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

        {/* Thanh nhập bình luận */}
        <div className="flex items-center mt-4 space-x-2">
          <input
            type="text"
            placeholder="Viết bình luận..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="flex-1 px-4 py-2 border rounded-md"
          />
          <button
            onClick={handleAddComment}
            className="px-4 py-2 bg-blue-500 text-white rounded-md"
          >
            Gửi
          </button>
        </div>
      </div>
    </div>
  );
};
