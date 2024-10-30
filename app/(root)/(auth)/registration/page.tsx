import RegistrationForm from "@/components/auth/registration-form";
import React from "react";

const Registration = () => {
  return (
    <section className="flex flex-col gap-4 border rounded-lg mx-10 md:mx-24 p-4">
      <h1 className="text-3xl font-bold">Registration</h1>
      <div className="w-full border-b " />
      <RegistrationForm />
    </section>
  );
};

export default Registration;
