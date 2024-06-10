// Welcome to Gravl

import styles from "../styles/landing.module.scss";
import Header from "@/components/header/Header.tsx";
import Counties from "../components/maps/Counties.tsx";
import SignUpButton from "@/components/landing/SignUpButton.tsx";
import { filterPlacesByType } from "@/lib/getPlaces.ts";
import Onboarding from "@/components/modals/Onboarding.tsx";

export default async function Landing({
  searchParams,
}: {
  searchParams: { ob: string };
}) {
  const welcome_to_gravl = await filterPlacesByType(
    "welcome_to_gravl",
    "counties"
  );

  return (
    <>
      {searchParams.ob && searchParams.ob === "true" && <Onboarding />}
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
