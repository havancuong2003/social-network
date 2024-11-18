import { useEffect, useState } from "react";
import { Post } from "../post";
import { mockPostData } from "../../../mock-data/mock-post-data";
import { Post as PostType } from "../../../model/user-profile.model";

export const Posts = () => {
  const [posts, setPosts] = useState<PostType[]>([]);
  useEffect(() => {
    const fetchPostData = mockPostData;
    console.log("check mock data", fetchPostData);

    setPosts(fetchPostData);
  });

  return (
    <>
      {posts.map((post) => {
        return <Post key={post.postId} postId={post.postId} />;
      })}
    </>
  );
};
