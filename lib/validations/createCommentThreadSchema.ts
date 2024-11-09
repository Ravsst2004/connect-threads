import { any, object, string } from "zod";

const MAX_FILE_SIZE = 1024 * 1024 * 2;
const ACCEPTED_IMAGE_MIME_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export const createCommentThreadSchema = object({
  userId: string(),
  threadId: string(),
  retrieveId: string(),
  content: string()
    .min(1, "Content at least 1 character")
    .max(1024, "Content is too long (max 1024 characters)."),
  image: any()
    .optional()
    .nullable()
    .refine((files) => {
      return (
        files === undefined ||
        files === null ||
        files.length === 0 ||
        files?.[0]?.size <= MAX_FILE_SIZE
      );
    }, `Max image size is 2MB.`)
    .refine(
      (files) =>
        files === undefined ||
        files === null ||
        files.length === 0 ||
        ACCEPTED_IMAGE_MIME_TYPES.includes(files?.[0]?.type),
      "Only .jpg, .jpeg, .png, and .webp formats are supported."
    ),
});
