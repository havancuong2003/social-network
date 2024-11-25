// import { useEffect, useState, useRef } from "react";
// import { PostType } from "../model/user-profile.model";
// import { getPostsService } from "../services/post.service";

// export const usePosts = () => {
//   const [posts, setPosts] = useState<PostType[]>([]);
//   const [loading, setLoading] = useState<boolean>(false);
//   const [error, setError] = useState<string | null>(null);
//   const [page, setPage] = useState<number>(1);
//   const [hasMore, setHasMore] = useState<boolean>(true);
//   const [clicked, setClicked] = useState<boolean>(false);
//   const isFirstRender = useRef(true);

//   useEffect(() => {
//     if (isFirstRender.current) {
//       isFirstRender.current = false;
//       return;
//     }

//     const fetchPostData = async () => {
//       setLoading(true);
//       try {
//         const data = await getPostsService(page);
//         if (data.length > 0) {
//           setPosts((prev) => [...prev, ...data]);
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
//   }, [page]);

//   const resetPosts = () => {
//     setPosts([]); // Reset danh sách bài viết
//     setPage(1); // Đặt lại trang về 1
//     setHasMore(true); // Đặt lại trạng thái có thêm bài viết
//     setClicked((pre) => !pre);
//   };
//   const loadMore = () => {
//     if (!loading && hasMore) {
//       setPage((prevPage) => prevPage + 1);
//     }
//   };

//   const handleScroll = () => {
//     const scrollPosition = window.innerHeight + window.scrollY;
//     const scrollHeight = document.documentElement.scrollHeight;

//     if (scrollPosition + 100 >= scrollHeight && hasMore && !loading) {
//       loadMore();
//     }
//   };

//   useEffect(() => {
//     window.addEventListener("scroll", handleScroll);
//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//     };
//   }, [hasMore, loading]);

//   const updatePost = (updatedPost: PostType) => {
//     setPosts((prevPosts) =>
//       prevPosts.map((post) =>
//         post.postId === updatedPost.postId ? updatedPost : post
//       )
//     );
//   };

//   return {
//     posts,
//     loading,
//     error,
//     updatePost,
//     loadMore,
//     hasMore,
//     resetPosts,
//     page,
//   };
// };
