import React from "react";
import HorizontalLine from "../ui/horizontal-line";
import Image from "next/image";
import Link from "next/link";
import FollowButton from "../profile/follow-button";

interface ActivityCardProps {
  type: string;
  content?: string | null;
  username?: string | null;
  userEmail?: string;
  sessionEmail?: string;
}

const ActivityCard = async ({
  type,
  content,
  username,
  userEmail,
  sessionEmail,
}: ActivityCardProps) => {
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
                    src={"/images/user-profile.png"}
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
                  <span className="text-gray-500 text-xs">3 hours ago</span>
                </h1>
              </div>
              {type === "follow" && (
                // TODO: follow back funtion
                <div>
                  {/* <Button>Follow Back</Button> */}
                  <FollowButton
                    userEmail={userEmail as string}
                    sessionEmail={sessionEmail as string}
                  />
                </div>
              )}
            </div>
          </div>
          <div id="content" className="py-2">
            <p>{content}</p>
          </div>
        </div>
      </article>
    </div>
  );
};

export default ActivityCard;

{
  /* <div>
  <HorizontalLine />
  <article className="py-4">
    <div>
      <div className="flex gap-2 items-center">
        <div className="w-14 h-14 rounded-full overflow-hidden flex items-center justify-center">
          <Image
            src={"/images/user-profile.png"}
            alt="profile"
            width={80}
            height={80}
            className="object-cover w-full h-full"
          />
        </div>
        <div id="user-info" className="flex flex-col items-start">
          <h1 className="flex items-center gap-4">
            <Link href={`/@username`} className="font-semibold">
              Username
            </Link>{" "}
            <span className="text-gray-500 text-xs">3 hours ago</span>
          </h1>
          <div id="content">
            <p>Follow you</p>
          </div>
        </div>
        <div>
          <Button>Action</Button>
        </div>
      </div>
    </div>
  </article>
</div>; */
}
