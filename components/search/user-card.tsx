import React from "react";
import HorizontalLine from "../ui/horizontal-line";
import Image from "next/image";
import Link from "next/link";

interface UserCardProps {
  username: string | null;
  userImage: string | null;
  name: string | null;
}

const UserCard = ({ username, userImage, name }: UserCardProps) => {
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
              <Link
                href={`/@${username}`}
                className="flex justify-center items-center gap-2"
              >
                <div className="w-8 h-8 rounded-full overflow-hidden flex items-center justify-center">
                  <Image
                    src={userImage || "/images/user-profile.png"}
                    alt="profile"
                    width={80}
                    height={80}
                    className="object-cover w-full h-full"
                  />
                </div>

                <h1 className="flex flex-col items-start">
                  <span className="font-semibold">{name}</span>
                  <span className="text-sm">{username}</span>{" "}
                </h1>
              </Link>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
};

export default UserCard;
