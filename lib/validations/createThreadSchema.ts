import { any, array, object, string } from "zod";

const MAX_FILE_SIZE = 1024 * 1024 * 2;
const ACCEPTED_IMAGE_MIME_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export const createThreadSchema = object({
  userId: string(),
  content: string().max(1024, "Content is too long (max 1024 characters)."),
  image: array(any())
    .refine((files) => {
      return (
        files.length === 0 || 
        files.every((file) => file.size <= MAX_FILE_SIZE)
      );
    }, `Max image size is 2MB for each image.`)
    .refine(
      (files) =>
        files.length === 0 || 
        files.every((file) => ACCEPTED_IMAGE_MIME_TYPES.includes(file.type)),
      "Only .jpg, .jpeg, .png, and .webp formats are supported."
    ),
});