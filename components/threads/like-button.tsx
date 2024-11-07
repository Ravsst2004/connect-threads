"use client";

import { isLikedThread, likeThread } from "@/lib/actions/threads";
import { IoIosHeartEmpty, IoMdHeart } from "react-icons/io";
import { useCallback, useEffect, useState } from "react";

interface LikeButtonProps {
  threadId: string;
  userId: string;
}

const LikeButton = ({ threadId, userId }: LikeButtonProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleIsLiked = async () => {
      setLoading(true);
      const result = await isLikedThread(userId, threadId);
      setIsLiked(result);
      setLoading(false);
    };
    handleIsLiked();
  }, [threadId, userId]);

  const handleLike = useCallback(
    async (event: React.FormEvent) => {
      event.preventDefault();
      const result = await likeThread(userId, threadId);
      setIsLiked(result);
    },
    [userId, threadId]
  );

  if (loading) {
    return null;
  }

  return (
    <form onSubmit={handleLike}>
      {isLiked ? (
        <button>
          <IoMdHeart className="text-red-500 h-7 w-7" />
        </button>
      ) : (
        <button>
          <IoIosHeartEmpty className="h-7 w-7" />
        </button>
      )}
    </form>
  );
};

export default LikeButton;
