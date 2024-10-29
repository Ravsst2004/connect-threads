import { object, string } from "zod";

export const registrationSchema = object({
  name: string()
    .min(4, "Name must be at least 4 characters long")
    .max(255, "Name must be less than 255 characters long"),
  email: string().email("Invalid email address"),
  password: string()
    .min(6, "Password must be at least 6 characters long")
    .max(20, "Password must be less than 20 characters long"),
  confirmPassword: string()
    .min(6, "Password must be at least 6 characters long")
    .max(20, "Password must be less than 20 characters long"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

export const loginSchema = object({
  email: string().email("Invalid email address"),
  password: string()
    .min(6, "Password must be at least 6 characters long")
    .max(20, "Password must be less than 20 characters long"),
});
