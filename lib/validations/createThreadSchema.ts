import { any, object, string } from "zod";

const MAX_FILE_SIZE = 1024 * 1024 * 2;
const ACCEPTED_IMAGE_MIME_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export const createThreadSchema = object({
  userId: string(),
  content: string()
    .min(1, "Content at least 1 character")
    .max(1024, "Content is too long (max 1024 characters)."),
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

// export const createThreadSchema = object({
//   userId: string(),
//   content: string()
//     .min(1, "Content at least 1 character")
//     .max(1024, "Content is too long (max 1024 characters)."),
//   images: any()
//     .optional()
//     .refine(
//       (files) =>
//         !files ||
//         (Array.isArray(files) &&
//           files.length > 0 &&
//           files.every((file) => file.size <= MAX_FILE_SIZE)),
//       { message: "Max image size is 2MB." }
//     )
//     .refine(
//       (files) =>
//         !files ||
//         (Array.isArray(files) &&
//           files.length > 0 &&
//           files.every((file) => ACCEPTED_IMAGE_MIME_TYPES.includes(file.type))),
//       { message: "Only .jpg, .jpeg, .png, and .webp formats are supported." }
//     ),
// });

// images: any()
//   .optional()
//   .refine(
//     (files: File[]) =>
//       !files ||
//       files.length === 0 ||
//       files.every((file) => file.size <= MAX_FILE_SIZE),
//     `Max image size is 2MB.`
//   )
//   .refine(
//     (files: File[]) =>
//       !files ||
//       files.length === 0 ||
//       files.every((file) => ACCEPTED_IMAGE_MIME_TYPES.includes(file.type)),
//     "Only .jpg, .jpeg, .png, and .webp formats are supported."
//   ),
