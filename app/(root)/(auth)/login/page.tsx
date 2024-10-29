import LoginForm from "@/components/auth/login-form";
import React from "react";

const Login = () => {
  return (
    <section className="flex flex-col gap-4 border rounded-lg mx-10 p-4 mt-28">
      <h1 className="text-3xl font-bold">Login</h1>
      <div className="w-full border-b " />
      <LoginForm />
    </section>
  );
};

export default Login;
