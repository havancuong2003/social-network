import React, { useEffect, useState } from "react";
import { Header } from "../components/header/header";
import { Footer, SideBar } from "../components";
import clsx from "clsx";
import { usePosts } from "../contexts";

interface LayoutProps {
  children: React.ReactNode;
  classes?: {
    [key: string]: string;
  };
}

export const Layout = ({ children, classes }: LayoutProps) => {
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

  useEffect(() => {
    window.history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
  }, []);

  const { resetPosts } = usePosts();
  const handleFooterClick = () => {
    resetPosts();
  };

  return (
    <div className="flex min-h-screen">
      <SideBar isOpen={isSidebarOpen} />
      <div className="flex flex-col w-full ">
        <div className="bg-blue-600 text-white fixed top-0 left-0 right-0 z-20">
          <Header
            onSidebarToggle={handleSidebarToggle}
            isOpen={isSidebarOpen}
          />
        </div>
        <div className="mt-20 flex justify-center">
          <div className={clsx(classes?.container)}>{children}</div>
        </div>
      </div>
      <Footer onFooterClick={handleFooterClick} />
    </div>
  );
};
