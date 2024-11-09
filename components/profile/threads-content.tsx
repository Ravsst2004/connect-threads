import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import ThreadsCard from "../threads/threads-card";
import { prisma } from "@/prisma/db";
import { auth } from "@/auth";
import ReplyList from "../threads/reply-list";

interface ThreadsContentProps {
  username: string;
}

const ThreadsContent = async ({ username }: ThreadsContentProps) => {
  const session = await auth();
  const user = await prisma.user.findUnique({
    where: {
      username: username,
    },
    include: {
      threads: {
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  return (
    <div>
      <Tabs defaultValue="threads">
        {username === session?.user?.username && (
          <TabsList className="w-full">
            <>
              <TabsTrigger value="threads" className="w-full ">
                Threads
              </TabsTrigger>
              <TabsTrigger value="reply" className="w-full">
                Reply
              </TabsTrigger>
            </>
          </TabsList>
        )}
        <TabsContent value="threads">
          {user?.threads && user.threads.length > 0 ? (
            user.threads.map((thread) => (
              <ThreadsCard
                key={thread.id}
                threadId={thread.id}
                content={thread.content}
                images={thread.images}
                createdAt={thread.createdAt}
                userImage={user.image}
                username={user.username}
              />
            ))
          ) : (
            <div>No Threads</div>
          )}
        </TabsContent>
        <TabsContent value="reply">
          {user?.threads && user.threads.length > 0 ? (
            <ReplyList />
          ) : (
            <div>No Threads</div>
          )}
          {/* <ReplyList /> */}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ThreadsContent;
