"use server";

import { prisma } from "@/prisma/db";
import { z } from "zod";
import { editUserSchema } from "../zod";
import { revalidatePath } from "next/cache";

export async function getUser(email: string | undefined) {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
    select: {
      email: true,
      name: true,
      username: true,
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
  const { email, name, username, bio } = values;

  const user = await prisma.user.update({
    where: {
      email,
    },
    data: {
      name,
      username,
      bio,
    },
  });

  revalidatePath("/profile", "page");
  return user;
}
