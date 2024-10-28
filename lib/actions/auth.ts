"use server";

import { z } from "zod";
import { registrationSchema } from "../zod";
import prisma from "@/prisma/db";
import { Config, uniqueUsernameGenerator } from "unique-username-generator";
import { redirect } from "next/navigation";

const generateUniqueUsername = async (name: string) => {
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

export async function signUp(values: z.infer<typeof registrationSchema>) {
  const { name, email, password } = values;

  const existingEmail = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (existingEmail) {
    return {
      error: "EXISTING_EMAIL",
      message: "Email already registered. Please use a different email.",
    };
  }

  const username = await generateUniqueUsername(name);

  const role = await prisma.role.findUnique({
    where: {
      name: "user",
    },
  });

  if (!role) {
    throw new Error("Role 'user' not found");
  }

  const user = await prisma.user.create({
    data: {
      name: name,
      username: username,
      email: email,
      password: password,
      roleId: role.id,
    },
  });

  redirect("/");
}
