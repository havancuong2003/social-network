import { axiosConfig } from "./axios.config";

export const getPostsService = async (page: number, limit: number = 5) => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 300));
    const response = await axiosConfig.get(`/api/post`, {
      params: { page, limit }, // Gửi query params
    });

    return response.data; // Trả về danh sách bài viết
  } catch (error: any) {
    console.error("Error during get post service:", error);
    throw new Error(
      error.response?.data?.message || "An error occurred during fetching posts"
    );
  }
};

export const uploadPost = async (data: FormData) => {
  try {
    const response = await axiosConfig.post("api/post/uploadPost", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error during upload post service:", error);
    throw new Error("An error occurred during the upload post service process");
  }
};

export const addComment = async (data: any) => {
  try {
    const response = await axiosConfig.post("api/comment/addComment", data);
    return response.data;
  } catch (error) {
    console.error("Error during add comment service:", error);
    throw new Error("An error occurred during the add comment service process");
  }
};

export const changeReaction = async (data: any) => {
  try {
    const response = await axiosConfig.post("api/post/changeReact", data);
    return response.data;
  } catch (error) {
    console.error("Error during add comment service:", error);
    throw new Error("An error occurred during the add comment service process");
  }
};

export const getPostsServiceByUser = async (
  page: number,
  limit: number = 5,
  userId: string
) => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 300));
    const response = await axiosConfig.get(`/api/post/${userId}`, {
      params: { page, limit }, // Gửi query params
    });

    return response.data; // Trả về danh sách bài viết
  } catch (error: any) {
    console.error("Error during get post service:", error);
    throw new Error(
      error.response?.data?.message || "An error occurred during fetching posts"
    );
  }
};
