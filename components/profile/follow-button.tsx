"use client";

import {
  isFollowingUser,
  followUser as toggleFollowUser,
} from "@/lib/actions/user";
import React, { useCallback, useEffect, useState } from "react";
import { Button } from "../ui/button";

interface FollowButtonProps {
  userEmail: string;
  sessionEmail: string;
}

const FollowButton = ({ userEmail, sessionEmail }: FollowButtonProps) => {
  const [isFollowing, setIsFollowing] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const handleIsFollow = async () => {
      if (!sessionEmail) {
        return;
      }

      setIsLoading(true);
      const result = await isFollowingUser(userEmail, sessionEmail);
      setIsFollowing(result);
      setIsLoading(false);
    };
    handleIsFollow();
  }, [userEmail, sessionEmail]);

  const handleFollow = useCallback(
    async (event: React.FormEvent) => {
      event.preventDefault();

      if (!sessionEmail) {
        return;
      }

      try {
        const updatedStatus = await toggleFollowUser(userEmail, sessionEmail);
        setIsFollowing(updatedStatus);
      } catch (error) {
        console.error("Error toggling follow status:", error);
      }
    },
    [userEmail, sessionEmail]
  );

  if (isLoading) {
    return <Button className="w-full">Loading...</Button>;
  }

  return (
    <form onSubmit={handleFollow}>
      {sessionEmail ? (
        isFollowing ? (
          <Button className="w-full" variant="outline">
            Unfollow
          </Button>
        ) : (
          <Button className="w-full">Follow</Button>
        )
      ) : null}
    </form>
  );
};

export default FollowButton;
