import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import ThreadsCard from "../threads-card";
import { Thread } from "@prisma/client";

interface ThreadsContentProps {
  threads: Thread[] | null | undefined;
  userImage: string;
  username: string;
}

const ThreadsContent = ({
  threads,
  userImage,
  username,
}: ThreadsContentProps) => {
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
          {threads && threads.length > 0 ? (
            threads.map((thread) => (
              <ThreadsCard
                key={thread.id}
                content={thread.content}
                images={thread.images}
                createdAt={thread.createdAt}
                userImage={userImage}
                username={username}
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
