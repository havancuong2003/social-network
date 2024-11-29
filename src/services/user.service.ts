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

export const getUserMedia = async (userId: string) => {
  try {
    const response = await axiosConfig.get(`/api/user/media/${userId}`);

    return response.data;
  } catch (error) {
    console.error("Error during logout:", error);
    throw new Error("An error occurred during the logout process");
  }
};
