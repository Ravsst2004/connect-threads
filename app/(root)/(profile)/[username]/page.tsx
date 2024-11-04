import ThreadsContent from "@/components/profile/threads-content";
import UserInfo from "@/components/profile/user-info";

interface ProfileProps {
  params: {
    username: string;
  };
}

const Profile = async ({ params }: ProfileProps) => {
  const { username: usernameAtSign } = await params;
  const username = decodeURIComponent(usernameAtSign).replace("@", "");

  return (
    <section className="px-6 mt-4">
      <UserInfo username={username} />
      <div className="mt-4">
        <ThreadsContent username={username} />
      </div>
    </section>
  );
};

export default Profile;
