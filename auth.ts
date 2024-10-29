import { compareSync } from "bcrypt-ts";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { prisma } from "./prisma/db";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { loginSchema } from "./lib/zod";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        const validatedFields = loginSchema.safeParse(credentials);

        if (!validatedFields.success) {
          return null;
        }
        const { email, password } = validatedFields.data;

        const user = await prisma.user.findUnique({
          where: {
            email,
          },
          include: {
            role: true,
          },
        });

        if (!user || !user.password) {
          throw new Error("User not found");
        }

        const passwordMatch = compareSync(password, user.password);

        if (!passwordMatch) return null;

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role.name,
        };
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
