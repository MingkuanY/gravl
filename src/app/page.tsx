// Welcome to Gravl

import styles from "../styles/landing.module.scss";
import Header from "@/components/header/Header.tsx";
import Counties from "../components/maps/Counties.tsx";
import SignUpButton from "@/components/landing/SignUpButton.tsx";
import { loadPlaces } from "@/actions/actions.ts";
import Onboarding from "@/components/onboarding/Onboarding.tsx";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/auth.ts";
import welcome from "../assets/Welcome.json";
import SignOut from "@/components/landing/SignOut.tsx";

export default async function Landing({
  searchParams,
}: {
  searchParams: { ob: string };
}) {
  const session = await getServerSession(authOptions);
  let email = session?.user.email || "";

  // welcome to gravl counties map
  const welcome_to_gravl = welcome;

  const places = await loadPlaces();

  return (
    <>
      {session && !searchParams.ob && <SignOut />}
      {session && searchParams.ob && searchParams.ob === "true" && (
        <Onboarding email={email} />
      )}
      <Header />
      <div className={styles.mainContainer}>
        <div className={styles.map}>
          <Counties
            places={places}
            data={welcome_to_gravl}
            pause={5}
            animate={true}
            toggleHighways={false}
          />
        </div>
        <p className={styles.motto}>Not all who wander are lost</p>
        <p className={styles.subtitle}>Map out your adventures</p>
        <SignUpButton />
      </div>
    </>
  );
}
