import Link from "next/link";

interface NavLinkProps {
  href: string;
  icon: React.ElementType;
  className?: string;
}

const NavLink = ({ href, icon: Icon, className }: NavLinkProps) => {
  return (
    <li>
      <Link href={href}>
        <Icon className={`w-7 h-7 ${className}`} />
      </Link>
    </li>
  );
};

export default NavLink;
