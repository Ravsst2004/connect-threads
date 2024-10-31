import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import ThreadsCard from "../threads-card";

const ThreadsContent = () => {
  const images = ["/images/logo-white.webp"];

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
          <ThreadsCard
            content="Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi
            facilis eum, esse sunt voluptas odio excepturi maxime. Laboriosam,
            cumque ea?"
          />
          <ThreadsCard content="Make an awesome logo." images={images} />
          <ThreadsCard content="Make an awesome logo." images={images} />
          <ThreadsCard content="Make an awesome logo." images={images} />
        </TabsContent>
        <TabsContent value="reply">Your reply here.</TabsContent>
      </Tabs>
    </div>
  );
};

export default ThreadsContent;
