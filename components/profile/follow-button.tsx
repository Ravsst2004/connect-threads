"use client";

import { toggleFollowUser } from "@/lib/actions/user";
import React, { useCallback, useState } from "react";
import { Button } from "../ui/button";

interface FollowButtonProps {
  userEmail: string;
  sessionEmail: string;
}

const FollowButton = ({ userEmail, sessionEmail }: FollowButtonProps) => {
  const [isFollowing, setIsFollowing] = useState<boolean>();
  const handleFollow = useCallback(
    async (event: React.FormEvent) => {
      event.preventDefault();

      try {
        const result = await toggleFollowUser(userEmail, sessionEmail);
        setIsFollowing(result);
      } catch (error) {
        console.error("Error toggling follow status:", error);
      }
    },
    [userEmail, sessionEmail]
  );

  return (
    <form onSubmit={handleFollow}>
      <Button className="w-full">{isFollowing ? "Unfollow" : "Follow"}</Button>
    </form>
  );
};

export default FollowButton;
