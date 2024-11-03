"use server";

import { z } from "zod";
import { loginSchema, registrationSchema } from "../validations/authSchema";
import { prisma } from "@/prisma/db";
import { Config, uniqueUsernameGenerator } from "unique-username-generator";
import { redirect } from "next/navigation";
import { hashSync } from "bcrypt-ts";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";

export const generateUniqueUsername = async (name: string) => {
  const splitName = name.split(" ");
  const config: Config = {
    dictionaries: [splitName],
    separator: "",
    style: "lowerCase",
    randomDigits: 4,
  };

  let username: string;
  let existingUsername;

  do {
    username = uniqueUsernameGenerator(config);
    existingUsername = await prisma.user.findUnique({
      where: {
        username: username,
      },
    });
  } while (existingUsername);

  return username;
};

export async function signUp(
  prevState: unknown,
  values: z.infer<typeof registrationSchema>
) {
  const { name, email, password } = values;

  const existingEmail = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (existingEmail) {
    return {
      message: "Email already registered. Please use a different email.",
    };
  }

  const hashedPassword = hashSync(password, 10);

  const username = await generateUniqueUsername(name);

  await prisma.user.create({
    data: {
      name: name,
      username: username,
      email: email,
      password: hashedPassword,
    },
  });

  redirect("/login");
}

export async function login(
  prevState: unknown,
  values: z.infer<typeof loginSchema>
) {
  const { email, password } = values;

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: "/",
      redirect: true,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return {
            message: "Invalid credentials",
          };
        default:
          return {
            message: "Something went wrong, please check your credentials",
          };
      }
    }
  }
}
