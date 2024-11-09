import React from "react";
import HorizontalLine from "../ui/horizontal-line";
import Image from "next/image";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";

interface ActivityCardProps {
  content?: string | null;
  username?: string | null;
  createdAt?: Date | null;
  userImage: string | null;
  type: string;
}

const ActivityCard = async ({
  content,
  username,
  createdAt,
  userImage,
  type,
}: ActivityCardProps) => {
  const formattedDate = createdAt
    ? formatDistanceToNow(new Date(createdAt), { addSuffix: true })
    : "";

  return (
    <div>
      <HorizontalLine />
      <article className="py-4">
        <div>
          <div>
            <div
              id="user-info"
              className="flex justify-between items-center gap-2"
            >
              <div className="flex justify-center gap-2">
                <div className="w-8 h-8 rounded-full overflow-hidden flex items-center justify-center">
                  <Image
                    src={userImage || "/images/user-profile.png"}
                    alt="profile"
                    width={80}
                    height={80}
                    className="object-cover w-full h-full"
                  />
                </div>
                <h1 className="flex items-center gap-2">
                  <Link href={`/@${username}`} className="font-semibold">
                    {username}
                  </Link>{" "}
                  <span className="text-gray-500 text-xs">{formattedDate}</span>
                </h1>
              </div>
            </div>
          </div>
          <div id="content" className="py-2">
            {type === "comment" && <p>Commented on your post</p>}
            <p>{content}</p>
          </div>
        </div>
      </article>
    </div>
  );
};

export default ActivityCard;
