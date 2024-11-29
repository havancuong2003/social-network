import { createContext, useContext, useState } from "react";
import { UserType } from "../model/user-profile.model";
import {
  loginService,
  logoutService,
  signUpService,
} from "../services/auth.service";
import { SignUpType } from "../model/login-signup.model";
interface UserContextType {
  user: UserType | null; // Cho phép user là null
  setUser: React.Dispatch<React.SetStateAction<UserType | null>>; // Updated to allow null
  loading: boolean;
  error: string | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  signUp: (data: SignUpType) => Promise<boolean>;
  userIdProfile: string | null;
  setUserIdProfile: React.Dispatch<React.SetStateAction<string | null>>;
}
const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<UserType | null>(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  // Lấy user từ localStorage khi component mount
  const [userIdProfile, setUserIdProfile] = useState<string | null>(null);
  const login = async (username: string, password: string) => {
    try {
      setLoading(true);
      const userData = await loginService(username, password);
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
      setLoading(false);
      setError(null);
      return true;
    } catch (err) {
      setError("Không thể đăng nhập: " + err);
      setLoading(false);
      return false;
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      await logoutService();
      setUser({} as UserType);
      setLoading(false);
      setError(null);
      localStorage.removeItem("user");
    } catch (err) {
      setError("Không thể dăng xuat.");
      setLoading(false);
    }
  };

  const signUp = async (data: SignUpType) => {
    try {
      setLoading(true);
      const userData = await signUpService(data);
      setUser(userData);
      setLoading(false);
      setError(null);
      return true;
    } catch (err) {
      setError("Cannot sign up: " + err);
      setLoading(false);
      return false;
    }
  };
  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        loading,
        error,
        login,
        logout,
        signUp,
        userIdProfile,
        setUserIdProfile,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useAuth must be used within a UserProvider");
  }
  return context;
};
