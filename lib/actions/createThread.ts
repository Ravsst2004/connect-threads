"use server";
import { prisma } from "@/prisma/db";

import { z } from "zod";
import { createThreadSchema } from "../validations/createThreadSchema";

export async function createThread(values: z.infer<typeof createThreadSchema>) {
  const { userId, content, image } = values;

  try {
    const thread = await prisma.thread.create({
      data: {
        authorId: userId,
        content,
        image,
        totalLikes: 0,
      },
    });
    return thread;
  } catch (error) {
    console.error("Error creating thread:", error);
    throw new Error("Failed to create thread");
  }
}
