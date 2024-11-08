import React from "react";
import NavLink from "./nav-link";
import { Heart } from "lucide-react";
import { auth } from "@/auth";
import { prisma } from "@/prisma/db";

const ActivitiesLink = async () => {
  const session = await auth();

  if (!session?.user?.username)
    return <NavLink href="/activities" icon={Heart} />;

  const totalNotifications = await prisma.notification.count({
    where: {
      user: {
        username: session?.user?.username,
      },
      isRead: false,
    },
  });

  return (
    <div className="relative">
      <NavLink href="/activities" icon={Heart} />

      {totalNotifications > 0 && (
        <span className="absolute top-0 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-white text-xs">
          {totalNotifications}
        </span>
      )}
    </div>
  );
};

export default ActivitiesLink;

// import React from "react";
// import NavLink from "./nav-link";
// import { Heart } from "lucide-react";
// import { auth } from "@/auth";
// import { prisma } from "@/prisma/db";

// const ActivitiesLink = async () => {
//   const session = await auth();
//   const totalNotifications = await prisma.notification.count({
//     where: {
//       userId: session?.user?.id,
//       isRead: false,
//     },
//   });

//   return (
//     <div className="relative">
//       <NavLink href="/activities" icon={Heart} />

//       {totalNotifications > 0 && (
//         <span className="absolute top-0 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-white text-xs">
//           {totalNotifications}
//         </span>
//       )}
//     </div>
//   );
// };

// export default ActivitiesLink;
