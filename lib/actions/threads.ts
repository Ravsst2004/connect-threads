"use server";

import { prisma } from "@/prisma/db";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { createThreadSchema } from "../validations/createThreadSchema";
import cloudinary from "../config/cloudinary";
import { createCommentThreadSchema } from "../validations/createCommentThreadSchema";

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

export async function getTotalThreadLikes(threadId: string) {
  const thread = await prisma.thread.findUnique({
    where: { id: threadId },
    select: { totalLikes: true },
  });

  return thread?.totalLikes || 0;
}

export async function likeThread(
  userId: string, // Thread owner
  threadId: string,
  senderEmail: string // Login user
) {
  const sender = await prisma.user.findUnique({
    where: { email: senderEmail },
  });

  if (!sender) return false;

  const existingLike = await prisma.like.findUnique({
    where: {
      userId_threadId: {
        userId: sender.id, // sender.id as the liker ID
        threadId,
      },
    },
  });

  if (existingLike) {
    await prisma.like.delete({
      where: {
        userId_threadId: {
          userId: sender.id,
          threadId,
        },
      },
    });

    await prisma.thread.update({
      where: { id: threadId },
      data: {
        totalLikes: {
          decrement: 1,
        },
      },
    });

    await prisma.notification.deleteMany({
      where: { userId: userId, senderId: sender.id },
    });
  } else {
    await prisma.like.create({
      data: { userId: sender.id, threadId },
    });

    await prisma.thread.update({
      where: { id: threadId },
      data: {
        totalLikes: {
          increment: 1,
        },
      },
    });

    if (sender.id !== userId) {
      await prisma.notification.create({
        data: {
          userId,
          senderId: sender.id,
          type: "like",
          content: `liked your thread`,
        },
      });
    }
  }

  revalidatePath(`/`, "layout");

  return !existingLike;
}

export async function isLikedThread(senderEmail: string, threadId: string) {
  const user = await prisma.user.findUnique({
    where: { email: senderEmail },
  });

  const existingLike = await prisma.like.findUnique({
    where: {
      userId_threadId: {
        userId: user?.id as string,
        threadId,
      },
    },
  });
  return !!existingLike;
}

export async function createComment(
  values: z.infer<typeof createCommentThreadSchema>
) {
  const { userId, threadId, content, image: images } = values;

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
    const thread = await prisma.comment.create({
      data: {
        userId,
        threadId,
        content,
        images: imageUrls,
      },
    });

    await prisma.thread.update({
      where: { id: threadId },
      data: {
        totalComments: {
          increment: 1,
        },
      },
    });
    return thread;
  } catch (error) {
    console.error("Error creating thread:", error);
    throw new Error("Failed to create thread");
  }
}

export async function getTotalThreadComments(threadId: string) {
  const thread = await prisma.thread.findUnique({
    where: { id: threadId },
    select: { totalComments: true },
  });

  return thread?.totalComments || 0;
}
