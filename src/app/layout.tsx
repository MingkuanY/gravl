import type { Metadata } from "next";
import { Josefin_Sans } from "next/font/google";
import "../styles/globals.scss";
import Header from "../components/header/Header.tsx";
import SessionWrapper from "@/components/session/SessionWrapper.tsx";

const josefinSans = Josefin_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Gravl",
  description: "Track your travels interactively.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionWrapper>
      <html lang="en">
        <body className={josefinSans.className}>
          <Header />
          {children}
        </body>
      </html>
    </SessionWrapper>
  );
}
