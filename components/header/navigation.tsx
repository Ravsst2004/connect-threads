import {
  House,
  Search,
  Heart,
  User,
  SquareArrowOutUpRight,
} from "lucide-react";
import NavLink from "./nav-link";
import { getUserByEmail } from "@/lib/actions/user";
import { auth } from "@/auth";

const Navigation = async () => {
  const session = await auth();
  let profilePage = "/login";

  if (session?.user?.email) {
    const user = await getUserByEmail(session.user.email);
    profilePage = user?.username ? `/@${user.username}` : "/login";
  }
  return (
    <nav className="fixed bottom-0 left-0 right-0 max-w-screen-sm mx-auto p-2 md:hidden">
      <ul className="flex items-center justify-between gap-10 py-4 px-8 border rounded-2xl bg-secondary">
        <NavLink href="/" icon={House} />
        <NavLink href="/search" icon={Search} />
        <NavLink href="/create-thread" icon={SquareArrowOutUpRight} />
        <NavLink href="/notifications" icon={Heart} />
        <NavLink href={profilePage} icon={User} />
      </ul>
    </nav>
  );
};

export default Navigation;
