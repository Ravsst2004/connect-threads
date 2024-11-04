import {
  House,
  Search,
  SquareArrowOutUpRight,
  Heart,
  User,
} from "lucide-react";
import NavLink from "./nav-link";
import { auth } from "@/auth";
import { getUserByEmail } from "@/lib/actions/user";

const Sidebar = async () => {
  const session = await auth();
  let profilePage = "/login";

  if (session?.user?.email) {
    const user = await getUserByEmail(session.user.email);
    profilePage = user?.username ? `/@${user.username}` : "/login";
  }

  return (
    <nav className="fixed left-0 top-1/3 p-2 hidden md:block">
      <ul className="flex flex-col items-center justify-between gap-10 py-4 px-8 border rounded-2xl bg-secondary">
        <NavLink href="/" icon={House} />
        <NavLink href="/search" icon={Search} />
        <NavLink href="/create-thread" icon={SquareArrowOutUpRight} />
        <NavLink href="/notifications" icon={Heart} />
        <NavLink href={profilePage} icon={User} />
      </ul>
    </nav>
  );
};

export default Sidebar;
