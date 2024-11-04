import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import ThreadsCard from "../threads-card";
import { prisma } from "@/prisma/db";

interface ThreadsContentProps {
  username: string;
}

const ThreadsContent = async ({ username }: ThreadsContentProps) => {
  const user = await prisma.user.findUnique({
    where: {
      username: username,
    },
    include: {
      threads: true,
    },
  });

  return (
    <div>
      <Tabs defaultValue="threads">
        <TabsList className="w-full">
          <TabsTrigger value="threads" className="w-full ">
            Threads
          </TabsTrigger>
          <TabsTrigger value="reply" className="w-full">
            Reply
          </TabsTrigger>
        </TabsList>
        <TabsContent value="threads">
          {user?.threads && user.threads.length > 0 ? (
            user.threads.map((thread) => (
              <ThreadsCard
                key={thread.id}
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
        <TabsContent value="reply">Your reply here.</TabsContent>
      </Tabs>
    </div>
  );
};

export default ThreadsContent;
