import { prisma } from "@/prisma/db";

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
