import React, { useEffect } from "react";
import { Header } from "../components/header/header";
import { Footer } from "../components";
import clsx from "clsx";
import { usePosts } from "../contexts";

interface LayoutProps {
  children: React.ReactNode;
  classes?: {
    [key: string]: string;
  };
}

export const Layout = ({
  children,
  classes,
  isSidebarOpen,
  handleSidebarToggle,
}: LayoutProps & {
  isSidebarOpen: boolean;
  handleSidebarToggle: () => void;
}) => {
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
      <div className="flex flex-col w-full ">
        <div className="bg-blue-600 text-white fixed top-0 left-0 right-0 z-30">
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
