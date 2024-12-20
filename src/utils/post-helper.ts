import { PostType, UserType } from "../model/user-profile.model";
import { addComment, changeReaction } from "../services/post.service";

// handleAddComment.ts
export const handleAddComment = async (
  inputRef: React.RefObject<HTMLDivElement>,
  post: PostType | null,
  handleUpdatePost: (updatedPost: PostType) => void,
  user: UserType | null
) => {
  if (post && inputRef.current) {
    const newComment = {
      _id: new Date().toISOString(),
      userAvatar: user?.profilePic || "",
      userName: user?.fullName || "Unknown User", // Provide a default value
      text: inputRef.current.innerHTML,
      date: new Date().toLocaleString(),
      userId: user?._id || "", // Ensure userId is a string, fallback to an empty string if undefined
    };
    const data = {
      postId: post.postId,
      text: inputRef.current.innerHTML,
    };
    await addComment(data);

    const updatedPost = {
      ...post,
      comments: [...post.comments, newComment], // Add the new comment
    };

    handleUpdatePost(updatedPost); // Update the post in the parent component
    inputRef.current.innerHTML = ""; // Clear the input after adding the comment
  }
};
// handleFocusComment.ts
export const handleFocusComment = (
  inputRef: React.RefObject<HTMLDivElement>
) => {
  if (inputRef.current) {
    inputRef.current.focus();
    const selection = window.getSelection();
    const range = document.createRange();
    range.selectNodeContents(inputRef.current);
    range.collapse(false); // Đặt con trỏ ở cuối
    selection?.removeAllRanges();
    selection?.addRange(range);
  }
};

// handleReaction.ts
export const handleReaction = async (
  selectedReaction: string | null,
  setSelectedReaction: React.Dispatch<React.SetStateAction<string | null>>,
  reaction: string,
  post: PostType,
  userProfile: UserType | null,
  handleUpdatePost: (updatedPost: PostType) => void
) => {
  const newReaction = selectedReaction === reaction ? null : reaction;

  // Cập nhật trạng thái reaction ở frontend
  setSelectedReaction(newReaction);
  const updatedPost = {
    ...post,
    tymedBy: newReaction
      ? [
          ...post.tymedBy,
          {
            _id: userProfile?._id || "",
            fullName: userProfile?.fullName || "Unknown User", // Ensure fullName is a string
            profilePic: userProfile?.profilePic || "", // Provide a default value for profilePic
          },
        ]
      : post.tymedBy.filter((user) => user._id !== userProfile?._id || ""),
  };

  handleUpdatePost(updatedPost);

  await changeReaction({
    postId: post.postId,
    reaction: newReaction,
    userId: userProfile?._id,
  });
};
