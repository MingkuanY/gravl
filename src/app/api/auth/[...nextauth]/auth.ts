import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import { Account, NextAuthOptions, Profile, Session, User } from "next-auth";
import { JWT } from "next-auth/jwt";
import GoogleProvider from "next-auth/providers/google";

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: { params: { access_type: "offline", prompt: "consent" } },
    }),
  ],
  callbacks: {
    async jwt({
      token,
      user,
      account,
      profile,
    }: {
      token: JWT;
      user?: User;
      account?: Account | null;
      profile?: Profile;
    }) {
      if (account) {
        // First login, save the access token and user profile in the token
        token.access_token = account.access_token!;
        token.refresh_token = account.refresh_token!;
        token.expires_at = account.expires_at!;
        token.user = {
          id: profile?.sub ?? "",
          name: profile?.name ?? "",
          email: profile?.email ?? "",
          image: profile?.image ?? "",
        };
      } else if (Date.now() < (token.expires_at ?? 0) * 1000) {
        // Subsequent logins, if the access token is still valid, return the token
        return token;
      } else {
        // Subsequent logins, if the access token has expired, try to refresh it
        if (!token.refresh_token) throw new Error("Missing refresh token");

        try {
          const response = await fetch("https://oauth2.googleapis.com/token", {
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams({
              client_id: process.env.GOOGLE_CLIENT_ID!,
              client_secret: process.env.GOOGLE_CLIENT_SECRET!,
              grant_type: "refresh_token",
              refresh_token: token.refresh_token!,
            }),
            method: "POST",
          });

          const refreshedTokens = await response.json();

          if (!response.ok) throw refreshedTokens;

          token.access_token = refreshedTokens.access_token!;
          token.expires_at = Math.floor(
            Date.now() / 1000 + refreshedTokens.expires_in!
          );
          token.refresh_token =
            refreshedTokens.refresh_token ?? token.refresh_token;
        } catch (error) {
          console.error("Error refreshing access token", error);
          token.error = "RefreshAccessTokenError";
        }
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      if (token?.user) {
        session.user = token.user;
      }
      if (token?.error) {
        session.error = token.error;
      }
      return session;
    },
  },
  useSecureCookies: false,
  adapter: PrismaAdapter(prisma),
};

declare module "next-auth" {
  interface Session {
    error?: "RefreshAccessTokenError";
    user: {
      id: string;
      name: string;
      email: string;
      image: string;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    access_token: string;
    expires_at: number;
    refresh_token: string;
    user: {
      id: string;
      name: string;
      email: string;
      image: string;
    };
    error?: "RefreshAccessTokenError";
  }
}
