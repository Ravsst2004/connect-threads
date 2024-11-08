"use client";

import {
  getTotalThreadLikes,
  isLikedThread,
  likeThread,
} from "@/lib/actions/threads";
import { IoIosHeartEmpty, IoMdHeart } from "react-icons/io";
import { useCallback, useEffect, useState } from "react";

interface LikeButtonProps {
  threadId: string;
  userId: string;
  senderEmail?: string;
}

const LikeButton = ({ threadId, userId, senderEmail }: LikeButtonProps) => {
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const [totalLikes, setTotalLikes] = useState<number>(0);

  useEffect(() => {
    const handleIsLiked = async () => {
      if (!senderEmail) return;

      setLoading(true);
      const totalLikes = await getTotalThreadLikes(threadId);
      setTotalLikes(totalLikes);
      const result = await isLikedThread(senderEmail, threadId);
      setIsLiked(result);
      setLoading(false);
    };
    handleIsLiked();
  }, [threadId, senderEmail]);

  const handleLike = useCallback(
    async (event: React.FormEvent) => {
      event.preventDefault();
      if (!senderEmail) return;

      setLoading(true);
      const result = await likeThread(userId, threadId, senderEmail);
      const totalLikes = await getTotalThreadLikes(threadId);
      setTotalLikes(totalLikes);
      setIsLiked(result);
      setLoading(false);
    },
    [userId, threadId, senderEmail]
  );

  if (loading) {
    return null;
  }

  return (
    <form onSubmit={handleLike}>
      {isLiked ? (
        <button type="submit" className="flex items-center gap-1">
          <IoMdHeart className="text-red-500 h-7 w-7" />
          <p>{totalLikes}</p>
        </button>
      ) : (
        <button type="submit" className="flex items-center gap-1">
          <IoIosHeartEmpty className="h-7 w-7" />
          {totalLikes > 0 && <p>{totalLikes}</p>}
        </button>
      )}
    </form>
  );
};

export default LikeButton;
