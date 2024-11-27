import axios from "axios";
import { axiosConfig } from "./axios.config";
import { SignUpType } from "../model/login-signup.model";

export const loginService = async (username: string, password: string) => {
  try {
    // Gửi yêu cầu đăng nhập đến backend
    const response = await axiosConfig.post("/api/auth/login", {
      userName: username,
      password: password,
    });

    // Xử lý dữ liệu trả về khi đăng nhập thành công
    const userData = response.data;
    console.log("User data:", userData._id);

    // Bạn có thể lưu thông tin người dùng vào localStorage, context hoặc state tùy theo nhu cầu
    localStorage.setItem("user", userData._id); // Lưu thông tin người dùng vào localStorage

    return userData; // Trả về dữ liệu người dùng nếu cần sử dụng ở nơi khác trong app
  } catch (error) {
    // Xử lý lỗi khi đăng nhập không thành công
    if (axios.isAxiosError(error) && error.response) {
      console.error("Login failed:", error.response.data);
      throw new Error(
        error.response.data || "An error occurred while logging in"
      );
    } else {
      console.error("Error:", error);
      throw new Error("An error occurred during the login process");
    }
  }
};

export const logoutService = async () => {
  try {
    const response = await axiosConfig.get("/api/auth/logout");
    return response.data;
  } catch (error) {
    console.error("Error during logout:", error);
    throw new Error("An error occurred during the logout process");
  }
};

export const signUpService = async (data: SignUpType) => {
  try {
    const response = await axiosConfig.post("/api/auth/signup", {
      userName: data.userName,
      password: data.password,
      email: data.email,
      fullName: data.fullName,
      gender: data.gender,
      confirmPassword: data.confirmPassword,
    });
    return response.data;
  } catch (error) {
    console.error("Error during logout:", error);
    throw new Error("An error occurred during the logout process");
  }
};
