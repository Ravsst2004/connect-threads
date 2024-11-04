import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import React from "react";


const NotFound = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="text-3xl font-bold mb-4">Page Not Found</h1>
      <Link href="/" className={buttonVariants({ variant: "outline" })}>
        Go Back
      </Link>
    </div>
  );
};

export default NotFound;
