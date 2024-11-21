import { useEffect, useState } from "react";
import { Post } from "../post";
import { mockPostData } from "../../../mock-data/mock-post-data";
import { Post as PostType } from "../../../model/user-profile.model";

export const Posts = () => {
  const [posts, setPosts] = useState<PostType[]>([]);

  // Thêm dependency array rỗng để useEffect chỉ chạy một lần khi component được mount
  useEffect(() => {
    const fetchPostData = mockPostData;
    setPosts(fetchPostData);
  }, []); // chỉ chạy một lần khi component được mount
  console.log("postsssss");

  return (
    <>
      {posts.map((post) => {
        return <Post key={post.postId} postId={post.postId} />;
      })}
    </>
  );
};
