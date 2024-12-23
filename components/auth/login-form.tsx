"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { loginSchema } from "@/lib/validations/authSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { z } from "zod";
import { startTransition, useActionState } from "react";
import { login as signInAction } from "@/lib/actions/auth";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const LoginForm = ({}) => {
  const [state, formAction] = useActionState(signInAction, null);
  const searchParams = useSearchParams();
  const errorParam = searchParams.get("error");

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof loginSchema>) => {
    startTransition(() => formAction(values));
  };

  return (
    <div className="space-y-4">
      {state?.message && (
        <p className="border p-4 rounded-lg text-red-500">{state.message}</p>
      )}
      {errorParam === "OAuthAccountNotLinked" && (
        <p className="border p-4 rounded-lg text-red-500">
          Account already used by another provider
        </p>
      )}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="jrodatuk@gmail.com"
                    type="email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="********" type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div>
            Don&apos;t have an account?{" "}
            <Link href="registration" className="text-blue-500">
              Sign Up
            </Link>
          </div>

          <Button type="submit" className="w-full">
            Login
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default LoginForm;
