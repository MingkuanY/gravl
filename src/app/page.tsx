// Welcome to Gravl

import styles from "../styles/landing.module.scss";
import Header from "@/components/header/Header.tsx";
import Counties from "../components/maps/Counties.tsx";
import SignUpButton from "@/components/landing/SignUpButton.tsx";
import { getPlacesByUserAndType } from "@/actions/actions.ts";
import Onboarding from "@/components/onboarding/Onboarding.tsx";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route.ts";

export default async function Landing({
  searchParams,
}: {
  searchParams: { ob: string };
}) {
  let email = "";
  const session = await getServerSession(authOptions);
  if (session) {
    email = session.user.email;
  }

  // welcome to gravl counties map
  const welcome_to_gravl = await getPlacesByUserAndType(
    "welcome_to_gravl",
    "counties"
  );

  return (
    <>
      {session && searchParams.ob && searchParams.ob === "true" && (
        <Onboarding email={email} />
      )}
      <Header />
      <div className={styles.mainContainer}>
        <div className={styles.map}>
          <Counties data={welcome_to_gravl} pause={5} animate={true} />
        </div>
        <p className={styles.motto}>Not all who wander are lost.</p>
        <SignUpButton />
      </div>
    </>
  );
}
