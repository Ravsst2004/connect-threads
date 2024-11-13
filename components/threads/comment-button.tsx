"use client";

import { CiChat1 } from "react-icons/ci";
import CommentForm from "./comment-form";
import { useEffect, useState } from "react";
import { getTotalThreadComments } from "@/lib/actions/threads";
import DialogWrapper from "../profile/dialog-wrapper";

interface CommentButtonProps {
  userId: string;
  threadId: string;
  retrieveId: string;
}

const CommentButton = ({
  userId,
  threadId,
  retrieveId,
}: CommentButtonProps) => {
  const [totalComments, setTotalComments] = useState<number>(0);

  useEffect(() => {
    const handleCommented = async () => {
      const totalComments = await getTotalThreadComments(threadId);
      setTotalComments(totalComments);
    };
    handleCommented();
  }, [threadId]);

  return (
    <>
      <DialogWrapper
        dialogTitle="Comment this thread"
        dialogTrigerContent={
          <div className="flex items-center gap-1">
            <CiChat1 className="h-7 w-7" />
            {totalComments > 0 && <p>{totalComments}</p>}{" "}
          </div>
        }
      >
        <CommentForm
          userId={userId}
          threadId={threadId}
          retrieveId={retrieveId}
        />
      </DialogWrapper>
    </>
    // <Dialog>
    //   <DialogTrigger>
    //     <div className="flex items-center gap-1">
    //       <CiChat1 className="h-7 w-7" />
    //       {totalComments > 0 && <p>{totalComments}</p>}
    //     </div>
    //   </DialogTrigger>
    //   <DialogContent>
    //     <DialogTitle className="px-4">Comment this thread</DialogTitle>
    //     <CommentForm
    //       userId={userId}
    //       threadId={threadId}
    //       retrieveId={retrieveId}
    //     />
    //   </DialogContent>
    // </Dialog>
  );
};

export default CommentButton;
