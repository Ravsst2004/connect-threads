import { Button } from "./button";
import { FaGoogle } from "react-icons/fa";
import { signIn } from "@/auth";

export const GoogleButton = () => {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("google", { redirectTo: "/profile" });
      }}
    >
      <Button type="submit" className="w-full">
        <FaGoogle /> Login with Google
      </Button>
    </form>
  );
};
