import { auth } from "@/auth";
import ThreadsContent from "@/components/profile/threads-content";
import UserInfo from "@/components/profile/user-info";
import { prisma } from "@/prisma/db";
import { notFound } from "next/navigation";

interface ProfileProps {
  params: {
    username: string;
  };
}

const Profile = async ({ params }: ProfileProps) => {
  const session = await auth();
  const { username: usernameAtSign } = await params;
  const username = decodeURIComponent(usernameAtSign).replace("@", "");
  const user = await prisma.user.findUnique({
    where: {
      username: username,
    },
  });

  if (!user) {
    return notFound();
  }

  return (
    <>
      <section>
        <UserInfo username={username} email={session?.user.email as string} />
        <div className="mt-4">
          <ThreadsContent username={username} />
        </div>
      </section>
    </>
  );
};

export default Profile;
