// Welcome to Gravl

import styles from "../styles/landing.module.scss";
import Header from "@/components/header/Header.tsx";
import Counties from "../components/maps/Counties.tsx";
import SignUpButton from "@/components/landing/SignUpButton.tsx";
import { addTripToUser, getPlacesByUserAndType } from "@/lib/visit.ts";
import Onboarding from "@/components/modals/Onboarding.tsx";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route.ts";
import { updateUser, uniqueUsername } from "@/lib/user.ts";
import trips from "../assets/MyTrips.json";

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

  // trips.forEach((trip) => {
  //   addTripToUser("clxo3r3600000t76epyeb8ksw", trip);
  // });

  return (
    <>
      {session && searchParams.ob && searchParams.ob === "true" && (
        <Onboarding
          email={email}
          updateUser={updateUser}
          uniqueUsername={uniqueUsername}
        />
      )}
      <Header />
      <div className={styles.mainContainer}>
        <div className={styles.map}>
          <Counties data={welcome_to_gravl} pause={5} />
        </div>
        <p className={styles.motto}>Not all who wander are lost.</p>
        <SignUpButton />
      </div>
    </>
  );
}
