import { Ellipsis } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import DeleteButton from "./delete-button";
import { auth } from "@/auth";
import { prisma } from "@/prisma/db";

interface MoreThreadsCardFeaturesProps {
  threadId?: string;
  userId?: string;
  commenterThreadId?: string;
}

const MoreThreadsCardFeatures = async ({
  threadId,
  userId,
  commenterThreadId,
}: MoreThreadsCardFeaturesProps) => {
  const session = await auth();

  if (!session) {
    return null;
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session?.user?.email || undefined,
    },
    include: {
      threads: true,
      comments: {
        include: {
          user: true,
        },
      },
    },
  });

  const isOwner = user?.threads?.some((thread) => thread.id === threadId);
  const isUserCommenter = user?.comments?.some(
    (comment) => comment.userId === userId
  );

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Ellipsis />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {(isOwner || isUserCommenter) && (
            <DeleteButton
              threadId={threadId}
              commentUserId={userId}
              commenterThreadId={commenterThreadId}
              userId={user?.id}
            />
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default MoreThreadsCardFeatures;

// const TheFeatures = () => {
//   return (
//     <div className="flex justify-between items-center">
//       <h1 className="text-red-500">Delete</h1>
//       <span>
//         <Trash2 />
//       </span>
//     </div>
//   );
// };
