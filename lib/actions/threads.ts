"use server";

import { prisma } from "@/prisma/db";
import { revalidatePath } from "next/cache";

export async function deleteThread(threadId: string) {
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
