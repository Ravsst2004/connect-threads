"use client";

import { logout as handleLogout } from "@/lib/actions/auth";
import { DropdownMenuItem } from "../ui/dropdown-menu";

const LogoutButton = () => {
  return (
    <DropdownMenuItem
      className="cursor-pointer"
      onSelect={() => handleLogout()}
    >
      <span className="text-red-500">Sign out</span>
    </DropdownMenuItem>
  );
};

export default LogoutButton;
