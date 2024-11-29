import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
} from "react";
import { PostType } from "../model/user-profile.model";
import { getPostsService } from "../services/post.service";
import { useAuth } from "./user-context";

interface PostContextType {
  posts: PostType[];
  loading: boolean;
  error: string | null;
  updatePost: (updatedPost: PostType) => void;
  loadMore: () => void;
  hasMore: boolean;
  resetPosts: () => void;
  page: number;
  createPostGlobal: (newPost: PostType) => void;
}

const PostContext = createContext<PostContextType | undefined>(undefined);

export const PostProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const isFirstRender = useRef(true);
  const [isClickedHome, setIsClickedHome] = useState<boolean>(false);
  const { user } = useAuth();

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    const fetchPostData = async () => {
      if (!user) return;

      setLoading(true);
      try {
        const data = await getPostsService(page);

        if (data.length > 0) {
          setPosts((prev) => [...prev, ...data]);
        } else {
          setHasMore(false);
        }
      } catch (err) {
        setError("Không thể tải dữ liệu bài viết.");
      } finally {
        setLoading(false);
      }
    };

    fetchPostData();
  }, [page]);

  useEffect(() => {
    const fetchPostData = async () => {
      if (!user) return;

      setLoading(true);
      try {
        const data = await getPostsService(1); // Gọi API với page = 1

        if (data.length > 0) {
          setPosts(data);
        } else {
          setHasMore(false);
        }
      } catch (err) {
        setError("Không thể tải dữ liệu bài viết.");
      } finally {
        setLoading(false);
      }
    };

    fetchPostData();
  }, [user, isClickedHome]); // Chỉ gọi API khi user thay đổi

  const resetPosts = () => {
    setTimeout(() => {
      setPosts([]);
      setPage(1);
      setHasMore(true); // Đặt lại trạng thái có thêm bài viết
      setIsClickedHome((pre) => !pre);
    }, 1000);

    window.scrollTo({ top: 0, behavior: "smooth" });
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

  const createPostGlobal = (newPost: PostType) => {
    setPosts((prevPosts) => [...prevPosts, newPost]);
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
    <PostContext.Provider
      value={{
        posts,
        loading,
        error,
        updatePost,
        loadMore,
        hasMore,
        resetPosts,
        page,
        createPostGlobal,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};

export const usePosts = () => {
  const context = useContext(PostContext);
  if (!context) {
    throw new Error("usePosts must be used within a PostProvider");
  }
  return context;
};
