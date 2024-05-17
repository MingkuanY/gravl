// Welcome to Gravl

import styles from "../styles/landing.module.scss";
import Header from "@/components/header/Header.tsx";
import Counties from "../components/maps/Counties.tsx";
import Dashboard from "./dashboard/page.tsx";
import { getServerSession } from "next-auth";
import { authOption } from "@/app/api/auth/[...nextauth]/route.ts";
import SignUpButton from "@/components/landing/SignUpButton.tsx";

export default async function Landing() {
  const session = await getServerSession(authOption);

  return (
    <>
      {!session ? (
        <>
          <Header />
          <div className={styles.mainContainer}>
            <div className={styles.map}>
              <Counties />
            </div>
            <p className={styles.motto}>Travel sets you free.</p>
            <SignUpButton />
          </div>
        </>
      ) : (
        <Dashboard />
      )}
    </>
  );
}
