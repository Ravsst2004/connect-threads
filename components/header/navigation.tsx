import { House, Search, Blocks, Heart, User } from "lucide-react";
import NavLink from "./nav-link";

const Navigation = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 max-w-screen-sm mx-auto p-2">
      <ul className="flex items-center justify-between gap-10 py-4 px-8 border rounded-2xl">
        <NavLink href="/" icon={House} />
        <NavLink href="/search" icon={Search} />
        <NavLink href="/blocks" icon={Blocks} />
        <NavLink href="/notifications" icon={Heart} />
        <NavLink href="/profile" icon={User} />
      </ul>
    </nav>
  );
};

export default Navigation;
