"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import React, { useState, useCallback } from "react";
import { deleteThread } from "@/lib/actions/threads";
import { Button } from "../ui/button";

const DeleteButton = ({ threadId }: { threadId?: string }) => {
  const [loading, setLoading] = useState(false);

  const handleDelete = useCallback(
    async (event: React.MouseEvent) => {
      event.preventDefault();
      setLoading(true);
      try {
        await deleteThread(threadId as string);
      } catch (error) {
        console.error("Failed to delete thread:", error);
      } finally {
        setLoading(false);
      }
    },
    [threadId]
  );

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" className="w-full">
          Delete
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure to delete?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            thread.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete} disabled={loading}>
            {loading ? "Deleting..." : "Continue"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteButton;
