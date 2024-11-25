import { CircularProgress, Typography, Fade } from "@mui/material";
import { usePosts } from "../../../contexts";
import { Post } from "../post";

export const Posts = () => {
  const { posts, loading, error, updatePost, hasMore, resetPosts } = usePosts();

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
      {posts.map((post) => (
        <Post key={post.postId} postShow={post} handleUpdatePost={updatePost} />
      ))}
      <button onClick={resetPosts}>HVC</button>
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
