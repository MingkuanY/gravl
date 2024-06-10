import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  adapter: PrismaAdapter(prisma),
  callbacks: {
    async signIn({ user }) {
      const existingUser = await prisma.user.findUnique({
        where: {
          email: user.email!,
        },
      });

      const isNewUser = !existingUser;
      if (isNewUser) {
        return "/?ob=true";
      }
      return `/${existingUser.username}`;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
