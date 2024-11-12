import { auth } from "@/auth";
import { prisma } from "@/prisma/db";
import React from "react";
import HorizontalLine from "../ui/horizontal-line";
import Image from "next/image";
import { formatDistanceToNow } from "date-fns";
import MoreThreadsCardFeatures from "./more-threads-card-features";
import Link from "next/link";

const ReplyList = async () => {
  const session = await auth();

  if (!session) {
    return null;
  }

  const user = await prisma.user.findUnique({
    where: {
      username: session.user.username,
    },
  });

  if (!user) {
    return null;
  }

  const comments = await prisma.comment.findMany({
    where: {
      userId: user.id,
    },
    include: {
      thread: {
        include: {
          author: true,
        },
      },
    },
  });

  // console.log("Comments fetched:", comments);

  if (comments.length === 0) {
    console.log("Tidak ada komentar yang ditemukan untuk user:", user.username);
  }

  return (
    <div>
      {comments.map((comment) => {
        const formattedDate = comment.createdAt
          ? formatDistanceToNow(new Date(comment.createdAt), {
              addSuffix: true,
            })
          : "";

        return (
          <section key={comment.id}>
            <HorizontalLine />
            <article className="py-4">
              <div>
                <div className="flex justify-between items-center">
                  <div id="user-info" className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full overflow-hidden flex items-center justify-center">
                      <Image
                        src={user.image || "/images/user-profile.png"}
                        alt="profile"
                        width={80}
                        height={80}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <h1 className="flex items-center gap-2">
                      <span className="font-semibold">{user.username}</span>{" "}
                      <span className="text-gray-500 text-xs">
                        {formattedDate}
                      </span>
                    </h1>
                  </div>
                  <MoreThreadsCardFeatures
                    userId={user.id}
                    commenterThreadId={comment.threadId}
                  />
                </div>
                <Link
                  href={`/@${comment.thread.author.username}/post/${comment.threadId}`}
                  id="content"
                >
                  <p className="py-2">{comment.content}</p>
                  {comment.images && comment.images.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {comment.images.map((image, index) => (
                        <Image
                          key={index}
                          src={image}
                          alt="image"
                          width={150}
                          height={150}
                          className="object-cover rounded-lg"
                        />
                      ))}
                    </div>
                  )}
                </Link>
              </div>
            </article>
          </section>
        );
      })}
    </div>
  );
};

export default ReplyList;
