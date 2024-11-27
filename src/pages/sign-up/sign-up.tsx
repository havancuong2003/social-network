import { useNavigate } from "react-router-dom";
import { signUpSchema, SignUpType } from "../../model/login-signup.model";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "../../contexts";

export const SignUp = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpType>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      gender: "", // Đặt mặc định cho gender là chuỗi rỗng
    },
  });

  const { signUp, loading } = useAuth();

  const onSubmit: SubmitHandler<SignUpType> = async (data) => {
    try {
      
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const isSignUpSuccess = await signUp(data);

      if (isSignUpSuccess) {
        navigate("/login");
      }
    } catch (error) {}
  };

  return (
    <div className="">
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
        <h2 className="text-4xl tracking-tight">Create a new account</h2>
        <span className="text-sm">
          or{" "}
          <p
            className="text-blue-500 cursor-pointer"
            onClick={() => navigate("/login")}
          >
            sign in to your account
          </p>
        </span>
      </div>
      <div className="flex justify-center my-2 mx-4 md:mx-0">
        <form
          className="w-full max-w-xl bg-white rounded-lg shadow-md p-6 max-h-[700px] overflow-auto"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          {" "}
          {errors.email && (
            <div className="text-red-500">{errors.email.message}</div>
          )}
          <div className="flex flex-wrap -mx-3 mb-6">
            {/* Email */}
            <div className="w-full md:w-full px-3 mb-6">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="email"
              >
                Email address
              </label>
              <input
                className="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none"
                id="email"
                {...register("email")}
              />
            </div>

            {/* Username */}
            {errors.userName && (
              <div className="text-red-500">{errors.userName.message}</div>
            )}

            <div className="w-full md:w-full px-3 mb-6">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="username"
              >
                Username
              </label>
              <input
                className="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none"
                type="text"
                id="username"
                {...register("userName")}
              />
            </div>

            {/* Full Name */}
            {errors.fullName && (
              <div className="text-red-500">{errors.fullName.message}</div>
            )}
            <div className="w-full md:w-full px-3 mb-6">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="fullname"
              >
                Full Name
              </label>
              <input
                className="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none"
                type="text"
                id="fullname"
                {...register("fullName")}
              />
            </div>

            {/* Gender */}
            {errors.gender && (
              <div className="text-red-500">{errors.gender.message}</div>
            )}
            <div className="w-full md:w-full px-3 mb-6">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="gender"
              >
                Gender
              </label>
              <div className="flex items-center">
                <label className="mr-4">
                  <input
                    type="radio"
                    id="male"
                    value="male"
                    className="mr-2"
                    {...register("gender")}
                  />
                  Male
                </label>
                <label className="mr-4">
                  <input
                    type="radio"
                    id="female"
                    value="female"
                    className="mr-2"
                    {...register("gender")}
                  />
                  Female
                </label>
              </div>
            </div>

            {/* Password */}
            {errors.password && (
              <div className="text-red-500">{errors.password.message}</div>
            )}
            <div className="w-full md:w-full px-3 mb-6">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none"
                type="password"
                id="password"
                {...register("password")}
              />
            </div>

            {/* Confirm Password */}
            {errors.confirmPassword && (
              <div className="text-red-500">
                {errors.confirmPassword.message}
              </div>
            )}
            <div className="w-full md:w-full px-3 mb-6">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="confirm-password"
              >
                Confirm Password
              </label>
              <input
                className="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none"
                type="password"
                id="confirm-password"
                {...register("confirmPassword")}
              />
            </div>

            {/* Submit Button */}
            <div className="w-full md:w-full px-3 mb-6">
              <button
                className="appearance-none block w-full bg-blue-600 text-gray-100 font-bold border border-gray-900 rounded-lg py-3 px-3 leading-tight hover:bg-blue-500 focus:outline-none focus:border-gray-500"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Loading..." : "Sign Up"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
