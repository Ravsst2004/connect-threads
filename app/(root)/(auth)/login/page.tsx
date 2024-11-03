import LoginForm from "@/components/auth/login-form";
import { GoogleButton } from "@/components/auth/social-button";
import React from "react";

const Login = () => {
  return (
    <section className="flex flex-col gap-4 border rounded-lg mx-10 md:mx-24 p-4 mt-28">
      <h1 className="text-3xl font-bold">Login</h1>
      <div className="w-full border-b " />
      <LoginForm />
      <div className="my-4 flex items-center before:flex-1 before:border-t before:border-gray-300 after:flex-1 after:border-t after:border-gray-300">
        <p className="mx-4 mb-0 text-center font-semibold text-gray-600">or</p>
      </div>
      <GoogleButton />
    </section>
  );
};

export default Login;
