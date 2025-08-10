import type { Metadata } from "next";
import { Josefin_Sans } from "next/font/google";
import "../styles/globals.scss";
import SessionWrapper from "@/components/session/SessionWrapper";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/auth";
import { getUserWithData, loadPlaces } from "../actions/actions";
import { PlacesProvider } from "../contexts/PlacesContext";
import { UserProvider } from "../contexts/UserContext";

const josefinSans = Josefin_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Gravl",
  description: "Track your travels interactively.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);
  const sessionUser = session?.user?.email
    ? await getUserWithData(session.user.email)
    : null;

  const places = await loadPlaces();

  return (
    <SessionWrapper>
      <UserProvider sessionUser={sessionUser}>
        <PlacesProvider places={places}>
          <html lang="en">
            <head>
              <script
                src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`}
                defer
              ></script>
            </head>
            <body className={josefinSans.className}>{children}</body>
          </html>
        </PlacesProvider>
      </UserProvider>
    </SessionWrapper>
  );
}
