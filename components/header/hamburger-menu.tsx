import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu } from "lucide-react";

import ToggleTheme from "../toggle-theme";
import { auth } from "@/auth";
import LogoutButton from "../auth/logout-button";

const HamburgerMenu = async () => {
  const session = await auth();
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Menu className="w-8 h-8 cursor-pointer" aria-hidden="true" />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="mr-2 mt-2">
          <DropdownMenuItem className="cursor-pointer px-0">
            <ToggleTheme />
          </DropdownMenuItem>
          {session && <LogoutButton />}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default HamburgerMenu;
