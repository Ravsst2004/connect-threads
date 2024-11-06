import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const UserProfileLoading = () => {
  return (
    <section className="space-y-2">
      <Skeleton className="h-[12rem] w-full rounded-xl" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-full" />
      <div className="space-y-4 pt-2">
        {[...Array(2)].map((_, i) => (
          <div key={i} className="flex items-center space-x-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default UserProfileLoading;
