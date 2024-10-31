import { House, Search, Blocks, Heart, User } from "lucide-react";
import NavLink from "./nav-link";

const Sidebar = () => {
  return (
    <nav className="fixed left-0 top-1/3 p-2 hidden md:block">
      <ul className="flex flex-col items-center justify-between gap-10 py-4 px-8 border rounded-2xl bg-secondary">
        <NavLink href="/" icon={House} />
        <NavLink href="/search" icon={Search} />
        <NavLink href="/blocks" icon={Blocks} />
        <NavLink href="/notifications" icon={Heart} />
        <NavLink href="/profile" icon={User} />
      </ul>
    </nav>
  );
};

export default Sidebar;
