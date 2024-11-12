"use server";

import { prisma } from "@/prisma/db";

export async function searchUser(query: string) {
  if (!query) {
    return [];
  }

  const users = await prisma.user.findMany({
    where: {
      OR: [
        { name: { contains: query, mode: "insensitive" } },
        { username: { contains: query, mode: "insensitive" } },
      ],
    },
  });

  return users;
}
