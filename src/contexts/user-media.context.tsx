import { createContext, useContext, useEffect, useRef, useState } from "react";
import { getUserMedia } from "../services/user.service";
import { useAuth } from "./user-context";
import { PostType, UserMedia } from "../model/user-profile.model";

interface UserMediaContextType {
  medias: UserMedia[];
  setMedia: React.Dispatch<React.SetStateAction<UserMedia[]>>;
  loading: boolean;
  error: string | null;
  loadMore: () => void;
  hasMore: boolean;
  resetMedia: () => void;
  page: number;
  // setUserMediaId: React.Dispatch<React.SetStateAction<string | null>>;
  updatePostMedia: (updatedPost: PostType) => void;
}

const UserMediaContext = createContext<UserMediaContextType | undefined>(
  undefined
);

export const UserMediaContextProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [medias, setMedia] = useState<UserMedia[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const { userIdProfile } = useAuth();
  const firstInit = useRef(true);
  useEffect(() => {
    if (firstInit.current) {
      firstInit.current = false;
      return;
    }

    if (!userIdProfile) return;
    const mediaData = async () => {
      try {
        setLoading(true);
        const response = await getUserMedia(userIdProfile, 30, page);
        if (page === 1) {
          setMedia(response);
        } else {
          setMedia((prev) => [...prev, ...response]);
        }
      } catch (error) {
        console.log("error", error);
        setError("Không thể tải dữ liệu.");
      }
    };
    mediaData();
  }, [page, userIdProfile]);
  const loadMore = () => {
    if (hasMore && !loading) {
      setPage((prev) => prev + 1);
    }
  };

  const resetMedia = () => {
    setMedia([]);
    setPage(1);
    setHasMore(true);
  };

  const updatePostMedia = (updatedPost: PostType) => {
    setMedia((prev) => {
      return prev.map((userMedia) => {
        // Kiểm tra nếu postId của userMedia trùng với postId của updatedPost
        if (userMedia.post.postId === updatedPost.postId) {
          // Nếu trùng thì trả về bản sao của userMedia với post đã được cập nhật
          return {
            ...userMedia,
            post: updatedPost, // Cập nhật bài viết
          };
        }
        // Nếu không trùng, trả về userMedia không thay đổi
        return userMedia;
      });
    });
  };

  return (
    <UserMediaContext.Provider
      value={{
        medias,
        setMedia,
        loading,
        error,
        loadMore,
        hasMore,
        resetMedia,
        page,
        updatePostMedia,
        //   setUserMediaId,
      }}
    >
      {children}
    </UserMediaContext.Provider>
  );
};

export const useUserMedia = () => {
  const context = useContext(UserMediaContext);
  if (!context) {
    throw new Error("usePosts must be used within a PostProvider");
  }
  return context;
};
