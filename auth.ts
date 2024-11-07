import { compareSync } from "bcrypt-ts";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { prisma } from "./prisma/db";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { loginSchema } from "./lib/validations/authSchema";
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
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
      profile: async (profile) => {
        return {
          id: profile.sub,
          email: profile.email,
          name: profile.name,
          image: profile.picture,
        };
      },
    }),
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
        });

        if (!user || !user.password) {
          throw new Error("User not found");
        }

        const passwordMatch = compareSync(password, user.password);

        if (!passwordMatch) return null;

        return {
          id: user.id,
          username: user.username,
          name: user.name,
          email: user.email,
        };
      },
    }),
  ],
  callbacks: {
    authorized: async ({ auth, request: { nextUrl } }) => {
      const isLoggedIn = !!auth?.user;
      const protectedRoutes = ["/activities", "/create-thread"];
      const authenticatedRoutes = ["/login", "/registration"];
      const adminRoutes = ["/admin", "/admin/users", "/admin/threads"];

      const isProfileRoute =
        !nextUrl.pathname.startsWith("/") &&
        !protectedRoutes.includes(nextUrl.pathname) &&
        !authenticatedRoutes.includes(nextUrl.pathname) &&
        !adminRoutes.includes(nextUrl.pathname);

      if (
        !isLoggedIn &&
        (protectedRoutes.includes(nextUrl.pathname) || isProfileRoute)
      ) {
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

    async jwt({ token, user, account }) {
      if (account && account.provider === "google") {
        let userInDb = await prisma.user.findUnique({
          where: { email: user.email },
        });

        if (userInDb && !userInDb.username) {
          const generatedUsername = await generateUniqueUsername(user.name);
          userInDb = await prisma.user.update({
            where: { email: user.email },
            data: { username: generatedUsername },
          });
        }

        token.username = userInDb?.username;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.role = token.role;
        session.user.username = token.username;
      }
      return session;
    },
  },
});
