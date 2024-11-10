import { auth } from "@/auth";
import ListComment from "@/components/threads/list-comment";
import ThreadsCard from "@/components/threads/threads-card";
import { prisma } from "@/prisma/db";
import { notFound } from "next/navigation";
import React from "react";

interface DetailThreadProps {
  params: {
    username: string;
    threadId: string;
  };
}

const DetailThread = async ({ params }: DetailThreadProps) => {
  const session = await auth();
  const { username: usernameAtSign, threadId } = await params;
  const username = decodeURIComponent(usernameAtSign).replace("@", "");

  const detailThread = await prisma.thread.findUnique({
    where: {
      id: threadId,
    },
    include: {
      author: true,
      comments: {
        include: {
          user: true,
        },
      },
    },
  });
  const user = await prisma.user.findUnique({
    where: {
      username: username,
    },
  });
  const commentUser = await prisma.user.findUnique({
    where: {
      email: session?.user?.email as string,
    },
  });

  if (!user || !detailThread) {
    return notFound();
  }

  return (
    <section>
      <ThreadsCard
        username={username}
        threadId={threadId}
        userId={user.id}
        images={detailThread?.images as string[]}
        userImage={detailThread?.author?.image as string}
        content={detailThread?.content as string}
        userCommentId={commentUser?.id}
        senderEmail={session?.user?.email as string}
      />
      <div className="px-4 pb-20">
        {detailThread?.comments && detailThread.comments.length > 0 && (
          <>
            <h1 className="text-xl uppercase font-bold">Reply</h1>
            {detailThread.comments.map((comment) => {
              console.log(comment);

              return (
                <ListComment
                  key={comment.id}
                  id={comment.id}
                  content={comment.content}
                  createdAt={comment.createdAt}
                  updatedAt={comment.updatedAt}
                  images={comment.images}
                  threadId={comment.threadId}
                  userId={comment.userId}
                  username={comment.user.username as string}
                  userImage={comment.user.image as string}
                />
              );
            })}
          </>
        )}
      </div>
    </section>
  );
};

export default DetailThread;
