import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import { prisma } from "@/prisma/db";
import Image from "next/image";
import ThreadsContent from "../../../components/profile/threads-content";

const Profile = async () => {
  const session = await auth();
  const user = await prisma.user.findUnique({
    where: {
      email: session?.user?.email || undefined,
    },
    include: {
      threads: true,
    },
  });

  return (
    <section className="px-6 mt-4">
      <div>
        <div className="flex justify-between ">
          <div>
            <h1 className="text-2xl font-bold">{user?.name}</h1>
            <p className="font-medium text-lg">{user?.username}</p>
          </div>
          <div>
            <Image
              src={user?.image || "/images/user-profile.png"}
              alt="profile"
              width={80}
              height={80}
            />
          </div>
        </div>
        <p>{user?.bio || "No bio"}</p>
        <p className="text-gray-500 opacity-75">14 followers</p>
        <Button className="mt-4 w-full">Edit Profile</Button>
      </div>
      <div className="mt-4">
        <ThreadsContent />
      </div>
    </section>
  );
};

export default Profile;
