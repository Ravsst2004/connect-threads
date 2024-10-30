import { compareSync } from "bcrypt-ts";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { prisma } from "./prisma/db";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { loginSchema } from "./lib/zod";
import Google from "next-auth/providers/google";
import { generateUniqueUsername } from "./lib/actions/auth";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    Google,
    // Google({
    //   clientId: process.env.GOOGLE_CLIENT_ID,
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    //   async profile(profile) {
    //     const { name, email } = profile;

    //     let user = await prisma.user.findUnique({
    //       where: { email: email },
    //     });

    //     if (!user) {
    //       const username = await generateUniqueUsername(name);
    //       const role = await prisma.role.findUnique({
    //         where: { name: "user" },
    //       });

    //       if (!role) {
    //         throw new Error("Role 'user' not found");
    //       }

    //       user = await prisma.user.create({
    //         data: {
    //           name: name,
    //           username: username,
    //           email: email,
    //           password: null,
    //           roleId: role.id,
    //         },
    //       });
    //     }

    //     const userWithRole = {
    //       ...user,
    //       role: { id: user.roleId, name: "user" },
    //     };

    //     return userWithRole;
    //   },
    // }),
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
    }),
  ],
  callbacks: {
    authorized: async ({ auth, request: { nextUrl } }) => {
      const isLoggedIn = !!auth?.user;
      const protectedRoutes = ["/profile", "/notifications", "/add-thread"];
      const authenticatedRoutes = ["/login", "/registration"];
      const adminRoutes = ["/admin", "/admin/users", "/admin/threads"];

      if (!isLoggedIn && protectedRoutes.includes(nextUrl.pathname)) {
        return Response.redirect(new URL("/login", nextUrl));
      }

      if (isLoggedIn && authenticatedRoutes.includes(nextUrl.pathname)) {
        return Response.redirect(new URL("/", nextUrl));
      }

      if (
        (isLoggedIn &&
          adminRoutes.includes(nextUrl.pathname) &&
          auth.user?.role !== "admin") ||
        (!isLoggedIn && adminRoutes.includes(nextUrl.pathname))
      ) {
        return Response.redirect(new URL("/error", nextUrl));
      }

      return true;
    },
    async jwt({ token, user }) {
      if (user) token.role = user.role;
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.role = token.role;
      }
      return session;
    },
  },
});
