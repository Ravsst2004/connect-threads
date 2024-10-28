"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu } from "lucide-react";
import { useTheme } from "next-themes";

const HamburgerMenu = () => {
  const { setTheme } = useTheme();

  return (
    <div className="">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Menu className="w-8 h-8 cursor-pointer" aria-hidden="true" />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="mr-2 mt-2">
          <DropdownMenuItem>Settings</DropdownMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <DropdownMenuItem>Toggle theme</DropdownMenuItem>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="m-2">
              <DropdownMenuItem onClick={() => setTheme("light")}>
                Light
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>
                Dark
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("system")}>
                System
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default HamburgerMenu;
