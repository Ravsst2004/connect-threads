"use server";

import { prisma } from "@/prisma/db";
import { z } from "zod";
import { editUserSchema } from "../validations/editUserSchema";
import { revalidatePath } from "next/cache";
import cloudinary from "../config/cloudinary";

export async function getUserByEmail(email: string | undefined) {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
    select: {
      name: true,
      username: true,
      email: true,
      bio: true,
      image: true,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  return user;
}

export async function updateUser(values: z.infer<typeof editUserSchema>) {
  const { email, name, username, bio, image } = values;

  const userDetails = await getUserByEmail(email);

  let imageUrl = userDetails.image || "";

  if (userDetails.image) {
    try {
      const publicId = userDetails.image
        .split("upload/")[1]
        .split("/")
        .slice(1)
        .join("/")
        .split(".")[0];

      await cloudinary.uploader.destroy(publicId);
    } catch (error) {
      console.error("Error deleting previous image from Cloudinary:", error);
      throw new Error("Failed to delete previous image");
    }
  }

  if (image) {
    try {
      const uploadResponse = await cloudinary.uploader.upload(image, {
        folder: "connect-threads/user-profile",
      });
      imageUrl = uploadResponse.secure_url;
    } catch (error) {
      console.error("Error uploading image to Cloudinary:", error);
      throw new Error("Failed to upload image");
    }
  }

  const user = await prisma.user.update({
    where: { email },
    data: {
      name,
      username,
      bio,
      image: imageUrl || null,
    },
  });

  revalidatePath("/profile", "page");
  return user;
}
