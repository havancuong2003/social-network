import { CircularProgress, Typography, Fade } from "@mui/material";
import { usePosts } from "../../../contexts";
import { Post } from "../post";
import { PostType } from "../../../model/user-profile.model";
type PostProps = {
  posts: PostType[];
  updatePost: (updatedPost: PostType) => void;
};
export const Posts: React.FC<PostProps> = ({ posts, updatePost }) => {
  const { loading, error, hasMore } = usePosts();

  if (loading && posts.length === 0) {
    return (
      <Fade in={loading}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "200px",
          }}
        >
          <CircularProgress />
        </div>
      </Fade>
    );
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      {posts.map((post) => {
        return (
          <Post
            key={post.postId}
            postShow={post}
            handleUpdatePost={updatePost}
          />
        );
      })}

      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <Fade in={loading || !hasMore}>
          <div>
            {loading && <CircularProgress size={24} />}
            {!hasMore && (
              <Typography variant="h6" color="textSecondary">
                Hết bài viết
              </Typography>
            )}
          </div>
        </Fade>
      </div>
    </div>
  );
};
