import { useEffect, useState } from "react";
import { Posts, SideBar } from "../../components";
import { usePosts } from "../../contexts";
import { Layout } from "../../layout";

export const Home = () => {
  const { posts, updatePost } = usePosts();
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const handleSidebarToggle = () => setSidebarOpen((prev) => !prev);
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setSidebarOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <Layout
        isSidebarOpen={isSidebarOpen}
        handleSidebarToggle={handleSidebarToggle}
      >
        <SideBar isOpen={isSidebarOpen} />
        <Posts posts={posts} updatePost={updatePost} />
      </Layout>
    </>
  );
};
