import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import { NextAuthOptions } from "next-auth";
import { type User } from "next-auth";
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
    async jwt({ token, account }) {
      console.log("jwt works");
      if (account) {
        console.log("ACCOUNT! WE HAVE AN ACCOUNT BLESSED LORD WE DO");
        // First login, save the `access_token`, `refresh_token`, and other
        // details into the JWT

        const userProfile: User = {
          // @ts-ignore
          id: token.sub,
          // @ts-ignore
          name: profile?.name,
          // @ts-ignore
          email: profile?.email,
          image: token?.picture,
        };

        return {
          access_token: account.access_token,
          expires_at: account.expires_at,
          refresh_token: account.refresh_token,
          user: userProfile,
        };
      } else if (Date.now() < token.expires_at * 1000) {
        // Subsequent logins, if the `access_token` is still valid, return the JWT
        return token;
      } else {
        // Subsequent logins, if the `access_token` has expired, try to refresh it
        if (!token.refresh_token) throw new Error("Missing refresh token");

        try {
          // The `token_endpoint` can be found in the provider's documentation. Or if they support OIDC,
          // at their `/.well-known/openid-configuration` endpoint.
          // i.e. https://accounts.google.com/.well-known/openid-configuration
          const response = await fetch("https://oauth2.googleapis.com/token", {
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams({
              client_id: process.env.AUTH_GOOGLE_ID!,
              client_secret: process.env.AUTH_GOOGLE_SECRET!,
              grant_type: "refresh_token",
              refresh_token: token.refresh_token!,
            }),
            method: "POST",
          });

          const responseTokens = await response.json();

          if (!response.ok) throw responseTokens;

          return {
            // Keep the previous token properties
            ...token,
            access_token: responseTokens.access_token,
            expires_at: Math.floor(
              Date.now() / 1000 + (responseTokens.expires_in as number)
            ),
            // Fall back to old refresh token, but note that
            // many providers may only allow using a refresh token once.
            refresh_token: responseTokens.refresh_token ?? token.refresh_token,
          };
        } catch (error) {
          console.error("Error refreshing access token", error);
          // The error property can be used client-side to handle the refresh token error
          return { ...token, error: "RefreshAccessTokenError" as const };
        }
      }
    },
    async session({ session, token }) {
      if (token?.user && session) {
        // @ts-ignore
        session.user = token.user as User;
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
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    access_token: string;
    expires_at: number;
    refresh_token: string;
    error?: "RefreshAccessTokenError";
  }
}
