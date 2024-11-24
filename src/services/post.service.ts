import { axiosConfig } from "./axios.config";

export const getPostsService = async () => {
  try {
    const response = await axiosConfig.get("/api/post");
    return response.data;
  } catch (error) {
    console.error("Error during get post service:", error);
    throw new Error("An error occurred during the get post service process");
  }
};

export const uploadPost = async (data: FormData) => {
  try {
    console.log("formData", data.entries().next());
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
