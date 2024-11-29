import { axiosConfig } from "./axios.config";

export const getUserData = async (userId: string) => {
  try {
    const response = await axiosConfig.get(`/api/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error during logout:", error);
    throw new Error("An error occurred during the logout process");
  }
};

export const getUserMedia = async (userId: string, limit = 30, page = 1) => {
  try {
    const response = await axiosConfig.get(`/api/user/media/${userId}`, {
      params: { limit, page }, // Thêm tham số limit và page vào query
    });

    return response.data;
  } catch (error) {
    console.error("Error during fetching user media:", error);
    throw new Error("An error occurred while fetching user media");
  }
};
