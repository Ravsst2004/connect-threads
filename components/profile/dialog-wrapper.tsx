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
  dialogTrigerContent: React.ReactElement;
  children: React.ReactElement;
  dialogTriggerClassname?: string;
  dialogTitle?: string;
}

const DialogWrapper = ({
  dialogTrigerContent,
  children,
  dialogTriggerClassname,
  dialogTitle,
}: DialogWrapperProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleClose = () => {
    setIsDialogOpen(false);
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger
        onClick={() => setIsDialogOpen(true)}
        className={dialogTriggerClassname}
      >
        {dialogTrigerContent}
      </DialogTrigger>
      <DialogContent aria-describedby="dialog-description">
        <DialogHeader>
          <DialogTitle className="flex justify-start">{dialogTitle}</DialogTitle>
        </DialogHeader>
        {React.cloneElement(children, { onClose: handleClose })}
      </DialogContent>
    </Dialog>
  );
};

export default DialogWrapper;
