import Image from "next/image";
import HamburgerMenu from "./hamburger-menu";
import Link from "next/link";

const Header = () => {
  return (
    <header className="max-w-screen-sm mx-auto">
      <div className="flex justify-between items-center p-4">
        <Link href="/">
          <div className="hidden dark:inline">
            <Image
              src="/images/logo-white.webp"
              priority
              width={40}
              height={40}
              alt="logo"
            />
          </div>
          <div className="inline dark:hidden">
            <Image
              src="/images/logo-black.webp"
              priority
              width={40}
              height={40}
              alt="logo"
            />
          </div>
        </Link>
        <div className="relative">
          <HamburgerMenu />
        </div>
      </div>
    </header>
  );
};

export default Header;
