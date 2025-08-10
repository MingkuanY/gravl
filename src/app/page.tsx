// Welcome to Gravl

import styles from "../styles/landing.module.scss";
import Header from "@/components/header/Header";
import Counties from "../components/maps/Counties";
import MapOutYourLife from "@/components/landing/MapOutYourLife";
import Onboarding from "@/components/onboarding/Onboarding";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/auth";
import welcome from "../assets/Welcome.json";
import SignOut from "@/components/landing/SignOut";

export default async function Landing({
  searchParams,
}: {
  searchParams: { ob: string };
}) {
  const session = await getServerSession(authOptions);

  // welcome to gravl counties map
  const welcome_to_gravl = welcome;

  return (
    <>
      {session && !searchParams.ob && <SignOut />}
      {session && searchParams.ob && searchParams.ob === "true" && (
        <Onboarding />
      )}
      <Header />
      <div className={styles.mainContainer}>
        <div className={styles.map}>
          <Counties
            data={welcome_to_gravl}
            pause={5}
            animate={true}
            toggleHighways={false}
          />
        </div>
        <p className={styles.motto}>Not all who wander are lost</p>
        <MapOutYourLife />
      </div>
    </>
  );
}
