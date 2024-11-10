import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const UserProfileLoading = () => {
  return (
    <section className="space-y-2 px-10">
      <Skeleton className="h-[12rem] w-full rounded-xl" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-full" />
    </section>
  );
};

export default UserProfileLoading;
