import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
} from "react";
import { PostType } from "../model/user-profile.model";
import { getPostsServiceByUser } from "../services/post.service";
import { useAuth } from "./user-context";

interface UserPostContextType {
  posts: PostType[];
  loading: boolean;
  error: string | null;
  updatePost: (updatedPost: PostType) => void;
  loadMore: () => void;
  hasMore: boolean;
  resetPosts: () => void;
  page: number;
  //setUserId: React.Dispatch<React.SetStateAction<string | null>>;
  createPost: (newPost: PostType) => void;
}

const UserPostContext = createContext<UserPostContextType | undefined>(
  undefined
);

export const UserPostProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const isFirstRender = useRef(true);
  const [isClickedHome, setIsClickedHome] = useState<boolean>(false);
  // const [userId, setUserId] = useState<string | null>(null);
  const { userIdProfile } = useAuth();
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const fetchPostData = async () => {
      if (!userIdProfile) return;

      setLoading(true);
      try {
        const data = await getPostsServiceByUser(page, 5, userIdProfile);

        if (page === 1) {
          setPosts(data);
        } else {
          setPosts((prev) => [...prev, ...data]);
        }
        setHasMore(data.length > 0);
      } catch (err) {
        setError("Không thể tải dữ liệu bài viết.");
      } finally {
        setLoading(false);
      }
    };

    fetchPostData();
  }, [page, isClickedHome]);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const fetchPostData = async () => {
      if (!userIdProfile) return;

      setLoading(true);
      try {
        const data = await getPostsServiceByUser(page, 5, userIdProfile);

        setPosts(data);

        setHasMore(data.length > 0);
      } catch (err) {
        setError("Không thể tải dữ liệu bài viết.");
      } finally {
        setLoading(false);
      }
    };

    fetchPostData();
  }, []); // Chạy một lần khi component mount

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    const fetchPostData = async () => {
      if (!userIdProfile) return;

      setLoading(true);
      try {
        const data = await getPostsServiceByUser(1, 5, userIdProfile);

        setPosts(data);

        setHasMore(data.length > 0);
      } catch (err) {
        setError("Không thể tải dữ liệu bài viết.");
      } finally {
        setLoading(false);
      }
    };

    fetchPostData();
  }, [userIdProfile]);
  //   useEffect(() => {
  //     const fetchPostData = async () => {
  //       if (!userId) return;

  //       setLoading(true);
  //       try {
  //         const data = await getPostsServiceByUser(1, 5, userId); // Gọi API với page = 1

  //         if (data.length > 0) {
  //           setPosts(data);
  //         } else {
  //           setHasMore(false);
  //         }
  //       } catch (err) {
  //         setError("Không thể tải dữ liệu bài viết.");
  //       } finally {
  //         setLoading(false);
  //       }
  //     };

  //     fetchPostData();
  //   }, [userId, isClickedHome]); // Chỉ gọi API khi user thay đổi
  useEffect(() => {
    if (!userIdProfile) return; // Đảm bảo `userId` luôn tồn tại trước khi fetch.
    setPage(1);
    setHasMore(true);
  }, [userIdProfile]);

  const resetPosts = () => {
    setPosts([]);
    setPage(1);
    setHasMore(true); // Đặt lại trạng thái có thêm bài viết
    setIsClickedHome((pre) => !pre);
  };

  const loadMore = () => {
    if (hasMore && !loading) {
      setPage((prev) => prev + 1);
    }
  };

  const updatePost = (updatedPost: PostType) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.postId === updatedPost.postId ? updatedPost : post
      )
    );
  };

  const createPost = (newPost: PostType) => {
    setPosts((prevPosts) => [newPost, ...prevPosts]);
  };

  const handleScroll = () => {
    const scrollPosition = window.innerHeight + window.scrollY;
    const scrollHeight = document.documentElement.scrollHeight;

    if (scrollPosition + 100 >= scrollHeight && hasMore && !loading) {
      loadMore();
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [hasMore, loading]);

  return (
    <UserPostContext.Provider
      value={{
        posts,
        loading,
        error,
        updatePost,
        loadMore,
        hasMore,
        resetPosts,
        page,
        // setUserId,
        createPost,
      }}
    >
      {children}
    </UserPostContext.Provider>
  );
};

export const useUserPosts = () => {
  const context = useContext(UserPostContext);
  if (!context) {
    throw new Error("usePosts must be used within a PostProvider");
  }
  return context;
};
