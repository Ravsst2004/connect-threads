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
  console.log(session);

  return (
    <div>
      <div>
        {notifications && notifications.length > 0 ? (
          notifications
            .filter(
              (notification) =>
                notification.user.email === session?.user?.email &&
                notification.sender.email !== session?.user?.email
            )
            .map((notification, index) => (
              <ActivityCard
                key={index}
                content={notification.content}
                username={notification.sender?.username}
              />
            ))
        ) : (
          <h1 className="text-center font-medium text-xl">No Activity</h1>
        )}
      </div>
    </div>
  );
};

export default AllActivity;
