import prisma from "@/lib/prisma";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  adapter: PrismaAdapter(prisma),
  // callbacks: {
  //   async signIn({ account, profile }) {
  //     if (!profile?.email) {
  //       throw new Error("No profile");
  //     }

  //     const existingUser = await prisma.user.findUnique({
  //       where: {
  //         email: profile.email,
  //       },
  //     });

  //     const isNewUser = !existingUser;

  //     await prisma.user.upsert({
  //       where: {
  //         email: profile.email,
  //       },
  //       create: {
  //         email: profile.email,
  //         name: profile.name,
  //         image: profile.image,
  //       },
  //       update: {
  //         name: profile.name,
  //       },
  //     });

  //     return isNewUser ? `/auth/callback?newUser=${isNewUser}` : true;
  //   },
  //   async session({ session, token }) {
  //     const user = await prisma.user.findUnique({
  //       where: {
  //         email: session.user?.email || "",
  //       },
  //     });

  //     if (session.user && user) {
  //       session.user.id = user.id;
  //     }

  //     return session;
  //   },
  // },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
