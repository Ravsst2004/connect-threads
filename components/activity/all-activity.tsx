import React from "react";
import ActivityCard from "./activity-card";
import { auth } from "@/auth";
import { prisma } from "@/prisma/db";

const AllActivity = async () => {
  const session = await auth();

  await prisma.notification.updateMany({
    where: {
      userId: session?.user?.id,
      isRead: false,
    },
    data: {
      isRead: true,
    },
  });

  const notifications = await prisma.notification.findMany({
    where: {
      userId: session?.user?.id,
    },
    include: {
      user: true,
      sender: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const senderIds = notifications.map((notification) => notification.senderId);

  const senderUsers = await prisma.user.findMany({
    where: {
      id: { in: senderIds },
    },
  });
  console.log("notifications", notifications);
  console.log("senderUsers", senderUsers);

  return (
    <div>
      {notifications && notifications.length > 0 ? (
        notifications
          // TODO: fix notifications that appear in 2 accounts or more?
          .filter((notification) => notification.user.id === session?.user?.id)
          .map((notification, index) => (
            <ActivityCard
              key={index}
              type={notification.type}
              content={notification.content}
              username={notification.sender?.username}
              userEmail={notification.user.email as string}
              sessionEmail={session?.user?.email as string}
            />
          ))
      ) : (
        <h1 className="text-center font-medium text-xl">No Activity</h1>
      )}
    </div>
  );
};

export default AllActivity;
