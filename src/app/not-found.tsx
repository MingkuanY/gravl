import styles from "../styles/nopage.module.scss";
import Header from "../components/header/Header.tsx";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route.ts";
import { getUser } from "@/lib/getUser.ts";

export default async function NotFound() {
  // Redirect to new user landing page if not currently signed in. Else redirect to current user's home page.
  let path: string | null = "";
  const session = await getServerSession(authOptions);
  if (session) {
    const userEmail = session.user.email;
    const user = await getUser(userEmail);
    if (user) {
      path = user.username;
    }
  }

  return (
    <>
      <Header />
      <div className={styles.container}>
        <div className={styles.deadEndSign}>
          <p>Dead End</p>
        </div>
        <h1>Oops, it looks like this page doesn't exist!</h1>
        <Link href={`/${path}`}>
          <button>U-turn</button>
        </Link>
      </div>
    </>
  );
}
