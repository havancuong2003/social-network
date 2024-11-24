// import { useEffect, useState } from "react";
// import { PostType } from "../model/user-profile.model";
// import { mockPostData } from "../mock-data/mock-post-data";

// export const useFetchPost = (postId: string | undefined) => {
//   const [post, setPost] = useState<PostType | null>(null);
//   const [error, setError] = useState<string>("");

//   useEffect(() => {
//     if (!postId) {
//       setError("Invalid post ID");
//       return;
//     }

//     const fetchPost = async () => {
//       try {
//         const dataMock = mockPostData;
//         const postById = dataMock.find((post) => post.postId === postId);

//         if (!postById) {
//           throw new Error("Post not found");
//         }

//         setPost(postById);
//         setError("");
//       } catch (err) {
//         setError((err as Error).message);
//       }
//     };

//     fetchPost();
//   }, [postId]);

//   return { post, error, setPost };
// };
