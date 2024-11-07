import { auth } from "@/auth";
import { prisma } from "@/prisma/db";

const FollowersPage = async () => {
  const session = await auth();
  const users = await prisma.user.findMany({
    where: {
      email: session?.user?.email,
    },
    include: {
      followers: true,
    },
  });
  console.log(users);

  return <div></div>;
};

export default FollowersPage;
