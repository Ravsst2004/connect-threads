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
      thread: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  // console.log(notifications);

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
            .map((notification, index) => {
              console.log(notification);

              return (
                <ActivityCard
                  key={index}
                  type={notification.type}
                  content={notification.content}
                  threadId={notification.thread?.id}
                  username={notification.sender?.username}
                  createdAt={notification.createdAt}
                  userImage={notification.sender?.image}
                />
              );
            })
        ) : (
          <h1 className="text-center font-medium text-xl">No Activity</h1>
        )}
      </div>
    </div>
  );
};

export default AllActivity;
