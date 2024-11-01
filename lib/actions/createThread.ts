"use server";
import { prisma } from "@/prisma/db";

import { z } from "zod";
import { createThreadSchema } from "../validations/createThreadSchema";
import cloudinary from "../config/cloudinary";

export async function createThread(values: z.infer<typeof createThreadSchema>) {
  const { userId, content, images } = values;

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
