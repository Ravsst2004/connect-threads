import { getThreadsWithUser } from "@/lib/actions/threads";
import React from "react";
import ThreadsCard from "./threads-card";
import { auth } from "@/auth";
import { prisma } from "@/prisma/db";

const AllThreads = async () => {
  const session = await auth();
  const threads = await getThreadsWithUser();
  const user = session
    ? await prisma.user.findUnique({
        where: {
          email: session.user.email as string,
        },
      })
    : null;

  return (
    <div className="mb-24">
      {threads &&
        threads.length > 0 &&
        threads.map((thread) => (
          <ThreadsCard
            key={thread.id}
            threadId={thread.id}
            userId={thread.author.id}
            userCommentId={user?.id}
            content={thread.content}
            images={thread.images}
            createdAt={thread.createdAt}
            userImage={thread.author.image}
            username={thread.author.username}
            senderEmail={session?.user?.email}
          />
        ))}
    </div>
  );
};

export default AllThreads;
