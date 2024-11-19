import { PostType } from "../model/user-profile.model";

// handleAddComment.ts
export const handleAddComment = (
  inputRef: React.RefObject<HTMLDivElement>,
  post: PostType | null,
  setPost: React.Dispatch<React.SetStateAction<PostType | null>>
) => {
  if (inputRef.current && post) {
    const rawText = inputRef.current.innerText;
    const formattedText = rawText.replace(/\n/g, "<br />");

    if (formattedText.trim()) {
      const newCommentObj = {
        commentId: String(Math.random()),
        userId: "currentUserId",
        userName: "Bạn",
        userAvatar: "/default-avatar.png",
        text: formattedText,
        date: new Date().toLocaleString(),
      };

      setPost((prevPost) =>
        prevPost
          ? {
              ...prevPost,
              comments: [...prevPost.comments, newCommentObj],
            }
          : null
      );

      inputRef.current.innerText = "";
    }
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
