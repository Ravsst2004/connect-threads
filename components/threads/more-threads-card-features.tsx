import { Ellipsis } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import DeleteButton from "./delete-button";
import { auth } from "@/auth";
import { prisma } from "@/prisma/db";

interface MoreThreadsCardFeaturesProps {
  threadId: string;
}

const MoreThreadsCardFeatures = async ({
  threadId,
}: MoreThreadsCardFeaturesProps) => {
  const session = await auth();
  const user = await prisma.user.findUnique({
    where: {
      email: session?.user?.email || undefined,
    },
    include: {
      threads: true,
    },
  });

  const isOwner = user?.threads?.some((thread) => thread.id === threadId);

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Ellipsis />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {isOwner && <DeleteButton threadId={threadId} />}
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
