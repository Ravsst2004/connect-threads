import { auth } from "@/auth";
import ThreadsContent from "@/components/profile/threads-content";
import UserInfo from "@/components/profile/user-info";
import { buttonVariants } from "@/components/ui/button";
import { prisma } from "@/prisma/db";
import Link from "next/link";
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

  if (!session) {
    return (
      <section className="flex flex-col justify-center items-center">
        <h1>Please sign in to see other user profile</h1>
        <Link href="/login" className={buttonVariants({ variant: "default" })}>
          Login Now!
        </Link>
      </section>
    );
  }

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
