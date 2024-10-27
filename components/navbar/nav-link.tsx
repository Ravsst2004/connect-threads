import Link from "next/link";
import React from "react";

interface NavLinkProps {
  href: string;
  icon: React.ElementType;
  className?: string;
}

const NavLink = ({ href, icon: Icon, className }: NavLinkProps) => {
  return (
    <li>
      <Link href={href}>
        <Icon className={`w-10 h-10 ${className}`} />
      </Link>
    </li>
  );
};

export default NavLink;
