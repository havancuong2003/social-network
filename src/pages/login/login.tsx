import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { loginSchema, LoginType } from "../../model/login-signup.model";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginService } from "../../services/auth.service";
export const Login = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LoginType>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<LoginType> = async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const userData = await loginService(data.username, data.password);
      if (userData) {
        navigate("/");
      }
    } catch (error) {
      setError("root", {
        type: "manual",
        message: "username hoặc mật khẩu không chính xác",
      });
    }
  };

  return (
    <>
      <div className="text-center mt-24">
        <div className="flex items-center justify-center">
          <svg
            fill="none"
            viewBox="0 0 24 24"
            className="w-12 h-12 text-blue-500"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            />
          </svg>
        </div>
        <h2 className="text-4xl tracking-tight">Sign in into your account</h2>
        <span className="text-sm">
          or{" "}
          <p
            className="text-blue-500 cursor-pointer"
            onClick={() => navigate("/signup")}
          >
            register a new account
          </p>
        </span>
      </div>
      <div className="flex justify-center my-2 mx-4 md:mx-0">
        <form
          className="w-full max-w-xl bg-white rounded-lg shadow-md p-6"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-full px-3 mb-6">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="Email"
              >
                User Name
              </label>
              <input
                className="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none"
                {...register("username")}
                placeholder="username"
              />
              {errors.username && (
                <div className="text-red-500">{errors.username.message}</div>
              )}
            </div>
            <div className="w-full md:w-full px-3 mb-6">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="Password"
              >
                Password
              </label>
              <input
                className="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none"
                type="password"
                {...register("password")}
                placeholder="password"
              />
              {errors.password && (
                <div className="text-red-500">{errors.password.message}</div>
              )}
            </div>
            <div className="w-full flex items-center justify-between px-3 mb-3 ">
              <label htmlFor="remember" className="flex items-center w-1/2">
                <input
                  type="checkbox"
                  name="remember"
                  className="mr-1 bg-white shadow"
                />
                <span className="text-sm text-gray-700 pt-1">Remember Me</span>
              </label>
              <div className="w-1/2 text-right">
                <a href="#" className="text-blue-500 text-sm tracking-tight">
                  Forget your password?
                </a>
              </div>
            </div>
            <div className="w-full md:w-full px-3 mb-6">
              <button
                className="appearance-none block w-full bg-blue-600 text-gray-100 font-bold border border-gray-900 rounded-lg py-3 px-3 leading-tight hover:bg-blue-500 focus:outline-none focus:border-gray-500"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Signing in..." : "Sign in"}
              </button>
              {errors.root && (
                <div className="text-red-500">{errors.root.message}</div>
              )}
            </div>
          </div>
        </form>
      </div>
    </>
  );
};
