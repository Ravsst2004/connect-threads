"use client";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CiChat1 } from "react-icons/ci";
import CommentForm from "./comment-form";
import { useEffect, useState } from "react";
import { getTotalThreadComments } from "@/lib/actions/threads";

interface CommentButtonProps {
  userId: string;
  threadId: string;
}

const CommentButton = ({ userId, threadId }: CommentButtonProps) => {
  const [totalComments, setTotalComments] = useState<number>(0);

  useEffect(() => {
    const handleCommented = async () => {
      const totalComments = await getTotalThreadComments(threadId);
      setTotalComments(totalComments);
    };
    handleCommented();
  }, [threadId]);

  return (
    <Dialog>
      <DialogTrigger>
        <div className="flex items-center gap-1">
          <CiChat1 className="h-7 w-7" />
          {totalComments > 0 && <p>{totalComments}</p>}
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle className="px-4">Comment this thread</DialogTitle>
        <CommentForm userId={userId} threadId={threadId} />
      </DialogContent>
    </Dialog>
  );
};

export default CommentButton;
