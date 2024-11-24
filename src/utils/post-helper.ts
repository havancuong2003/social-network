import { PostType } from "../model/user-profile.model";

// handleAddComment.ts
export const handleAddComment = (
  inputRef: React.RefObject<HTMLDivElement>,
  post: PostType | null,
  handleUpdatePost: (updatedPost: PostType) => void
) => {
  if (post && inputRef.current) {
    const newComment = {
      _id: new Date().toISOString(), // Generate a unique ID for the comment
      userAvatar: "path/to/avatar", // Replace with actual user avatar
      userName: "User Name", // Replace with actual user name
      text: inputRef.current.innerHTML,
      date: new Date().toLocaleString(), // Format the date as needed
      userId: "user-id", // Add the userId property
    };

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
export const handleReaction = (
  selectedReaction: string | null,
  setSelectedReaction: React.Dispatch<React.SetStateAction<string | null>>,
  reaction: string
) => {
  setSelectedReaction(selectedReaction === reaction ? null : reaction);
};
