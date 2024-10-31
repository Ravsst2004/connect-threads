"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { buttonVariants } from "../ui/button";

interface DialogWrapperProps {
  triggerText: string;
  children: React.ReactElement;
}

const DialogWrapper = ({ triggerText, children }: DialogWrapperProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleClose = () => {
    setIsDialogOpen(false);
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger
        onClick={() => setIsDialogOpen(true)}
        className={`${buttonVariants({ variant: "default" })} mt-4 w-full`}
      >
        {triggerText}
      </DialogTrigger>
      <DialogContent aria-describedby="dialog-description">
        <DialogHeader>
          <DialogTitle className="flex justify-start">Edit Profile</DialogTitle>
        </DialogHeader>
        {React.cloneElement(children, { onClose: handleClose })}
      </DialogContent>
    </Dialog>
  );
};

export default DialogWrapper;
