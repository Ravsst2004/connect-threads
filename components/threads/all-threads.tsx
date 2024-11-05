import { getThreadsWithUser } from "@/lib/actions/threads";
import React from "react";
import ThreadsCard from "../threads-card";

const AllThreads = async () => {
  const threads = await getThreadsWithUser();

  return (
    <div>
      {threads &&
        threads.length > 0 &&
        threads.map((thread) => (
          <ThreadsCard
            key={thread.id}
            content={thread.content}
            images={thread.images}
            createdAt={thread.createdAt}
            userImage={thread.author.image}
            username={thread.author.username}
          />
        ))}
    </div>
  );
};

export default AllThreads;
