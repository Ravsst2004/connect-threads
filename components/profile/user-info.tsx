import Image from "next/image";
import React from "react";
import EditDialog from "./edit-dialog";
import { prisma } from "@/prisma/db";
import { auth } from "@/auth";
import FollowButton from "./follow-button";

interface UserInfoProps {
  username: string;
}

const UserInfo = async ({ username }: UserInfoProps) => {
  const session = await auth();
  const user = await prisma.user.findUnique({
    where: {
      username: username,
    },
    include: {
      threads: true,
    },
  });
  return (
    <div>
      <div className="flex justify-between ">
        <div>
          <h1 className="text-2xl font-bold">{user?.name}</h1>
          <p className="font-medium text-lg">{user?.username}</p>
        </div>
        <div className="w-20 h-20 rounded-full overflow-hidden flex items-center justify-center">
          <Image
            src={user?.image || "/images/user-profile.png"}
            alt="profile"
            width={80}
            height={80}
            className="object-cover w-full h-full"
          />
        </div>
      </div>
      <p>{user?.bio || "No bio"}</p>
      <p className="text-gray-500 opacity-75 my-2">14 followers</p>
      {session?.user?.email === user?.email ? (
        <EditDialog />
      ) : (
        <>
          <FollowButton
            userEmail={user?.email as string}
            sessionEmail={session?.user?.email as string}
          />
        </>
      )}
    </div>
  );
};

export default UserInfo;
