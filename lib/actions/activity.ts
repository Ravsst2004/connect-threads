"use server";

import { prisma } from "@/prisma/db";

export async function getNotifications(userId: string) {
  return await prisma.notification.findMany({
    where: {
      userId: userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}
