"use server";

import { prisma } from "@/prisma/db";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { createThreadSchema } from "../validations/createThreadSchema";
import cloudinary from "../config/cloudinary";

export async function createThread(values: z.infer<typeof createThreadSchema>) {
  const { userId, content, image: images } = values;

  let imageUrls = [];

  if (images && images.length > 0) {
    try {
      const uploadPromises = images.map((image: string) =>
        cloudinary.uploader.upload(image, {
          folder: "connect-threads",
        })
      );

      const uploadResponses = await Promise.all(uploadPromises);

      imageUrls = uploadResponses.map((response) => response.secure_url);
    } catch (error) {
      console.error("Error uploading images to Cloudinary:", error);
      throw new Error("Failed to upload images");
    }
  }

  try {
    const thread = await prisma.thread.create({
      data: {
        authorId: userId,
        content,
        images: imageUrls,
        totalLikes: 0,
      },
    });
    return thread;
  } catch (error) {
    console.error("Error creating thread:", error);
    throw new Error("Failed to create thread");
  }
}

export async function deleteThread(threadId: string) {
  const thread = await prisma.thread.findUnique({
    where: {
      id: threadId,
    },
  });

  if (!thread) {
    throw new Error("Thread not found");
  }

  if (thread.images && thread.images.length > 0) {
    try {
      for (const imageUrl of thread.images) {
        const publicId = imageUrl
          .split("upload/")[1]
          .split("/")
          .slice(1)
          .join("/")
          .split(".")[0];

        await cloudinary.uploader.destroy(publicId);
      }
    } catch (error) {
      console.error("Error deleting images from Cloudinary:", error);
      throw new Error("Failed to delete images");
    }
  }

  await prisma.thread.delete({
    where: {
      id: threadId,
    },
  });

  revalidatePath(`/`, "layout");
}

export async function getThreadsWithUser() {
  return await prisma.thread.findMany({
    include: {
      author: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}
