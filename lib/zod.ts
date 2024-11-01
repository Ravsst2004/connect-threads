import { any, object, string } from "zod";

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

const MAX_FILE_SIZE = 1024 * 1024 * 2;
const ACCEPTED_IMAGE_MIME_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export const editUserSchema = object({
  email: string().email("Invalid email address"),
  name: string()
    .min(4, "Name must be at least 4 characters long")
    .max(255, "Name must be less than 255 characters long"),
  username: string()
    .min(4, "Username must be at least 4 characters long")
    .max(15, "Username must be less than 15 characters long")
    .regex(/^\S*$/, "Username cannot contain spaces"),
  bio: string().max(255, "Bio must be less than 255 characters long"),
  image: any()
    .refine((files) => {
      return (
        files === undefined ||
        files === null ||
        files?.[0]?.size <= MAX_FILE_SIZE
      );
    }, `Max image size is 2MB.`)
    .refine(
      (files) =>
        files === undefined ||
        files === null ||
        ACCEPTED_IMAGE_MIME_TYPES.includes(files?.[0]?.type),
      "Only .jpg, .jpeg, .png, and .webp formats are supported."
    ),
});
