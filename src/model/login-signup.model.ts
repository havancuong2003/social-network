import { z } from "zod";

// Login Schema
export const loginSchema = z.object({
  username: z.string().min(1, "Username is required"), // Đảm bảo rằng username không để trống
  password: z.string().min(6, "Password must be at least 6 characters"), // Password tối thiểu 6 ký tự
});

// SignUp Schema
export const signUpSchema = z
  .object({
    email: z
      .string()
      .email("Invalid email address")
      .min(1, "Email is required"), // Đảm bảo email hợp lệ và không để trống
    userName: z.string().min(1, "Username is required"), // Username bắt buộc
    fullName: z.string().min(1, "Full name is required"), // Full name bắt buộc
    password: z.string().min(6, "Password must be at least 6 characters"), // Password bắt buộc và tối thiểu 6 ký tự
    confirmPassword: z
      .string()
      .min(6, "Confirm password must be at least 6 characters"), // Confirm password cũng cần tối thiểu 6 ký tự
    gender: z.string().min(1, "Gender is required"), // Gender bắt buộc
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        path: ["confirmPassword"],
        message: "Passwords don't match",
        code: z.ZodIssueCode.custom,
      });
    }
  });

// Types cho Login và SignUp
export type LoginType = z.infer<typeof loginSchema>;
export type SignUpType = z.infer<typeof signUpSchema>;
