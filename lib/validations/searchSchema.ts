import { object, string } from "zod";

export const searchSchema = object({
  query: string(),
});
