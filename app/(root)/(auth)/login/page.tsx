import LoginForm from "@/components/auth/login-form";
import { GoogleButton } from "@/components/ui/social-button";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

const Login = async (props: { searchParams: SearchParams }) => {
  const searchParams = await props.searchParams;
  const error = searchParams.query;

  // TODO: Fix searchParams
  return (
    <section className="flex flex-col gap-4 border rounded-lg mx-10 md:mx-24 p-4 mt-28">
      <h1 className="text-3xl font-bold">Login</h1>
      <div className="w-full border-b " />
      {error === "OAuthAccountNotLinked" && (
        <p className="border p-4 rounded-lg text-red-500">
          Account already used by another provider
        </p>
      )}
      <LoginForm />
      <div className="my-4 flex items-center before:flex-1 before:border-t before:border-secondary after:flex-1 after:border-t after:border-secondary">
        <p className="mx-4 mb-0 text-center font-semibold text-gray-600">or</p>
      </div>
      <GoogleButton />
    </section>
  );
};

export default Login;
