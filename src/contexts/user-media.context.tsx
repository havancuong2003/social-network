import { createContext, useContext, useEffect, useRef, useState } from "react";
import { getUserMedia } from "../services/user.service";
import { useAuth } from "./user-context";
import { UserMedia } from "../model/user-profile.model";

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
        const response = await getUserMedia(userIdProfile as string);
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
