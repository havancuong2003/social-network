import { useEffect, useState } from "react";
import { Post } from "../post";
import { PostType } from "../../../model/user-profile.model";
import { getPostsService } from "../../../services/post.service";

export const Posts = () => {
  const [posts, setPosts] = useState<PostType[]>([]);

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const data = await getPostsService();
        console.log("posts", data);

        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPostData(); // Gọi hàm async
  }, []); // Chạy một lần khi component mount

  const handleUpdatePost = (updatedPost: PostType) => {
    console.log("updatedPost", updatedPost);

    const updatedPosts = posts.map((post) => {
      if (post.postId === updatedPost.postId) {
        return updatedPost;
      }
      return post;
    });
    setPosts(updatedPosts);
  };
  return (
    <>
      {posts.map((post) => {
        return (
          <Post
            key={post.postId}
            postShow={post}
            handleUpdatePost={handleUpdatePost}
          />
        );
      })}
    </>
  );
};
