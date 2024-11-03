import { signIn } from "@/auth";
import { FaGoogle } from "react-icons/fa";

export const GoogleButton = () => {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("google", { redirectTo: "/profile" });
      }}
    >
      <button
        type="submit"
        className="flex items-center justify-center gap-1 py-2.5 rounded-lg uppercase text-white font-medium text-sm bg-blue-500 w-full"
      >
        <FaGoogle /> Sign In with Google
      </button>
    </form>
  );
};
