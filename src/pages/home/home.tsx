import { Posts } from "../../components";
import { usePosts } from "../../contexts";

export const Home = () => {
  const { posts } = usePosts();

  return (
    <>
      <Posts posts={posts} />
    </>
  );
};
