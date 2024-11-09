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
  const commentUser = await prisma.user.findUnique({
    where: {
      email: session?.user?.email as string,
    },
  });

  console.log(user);

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
                username={user.username}
                threadId={thread.id}
                userId={user.id}
                images={thread.images}
                userImage={user.image}
                content={thread.content}
                userCommentId={commentUser?.id}
                senderEmail={session?.user?.email as string}
                createdAt={thread.createdAt}
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
