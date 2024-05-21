// Welcome to Gravl

import styles from "../styles/landing.module.scss";
import Header from "@/components/header/Header.tsx";
import Counties from "../components/maps/Counties.tsx";
import Dashboard from "./[username]/page.tsx";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route.ts";
import SignUpButton from "@/components/landing/SignUpButton.tsx";
import { filterPlacesByType } from "@/lib/getPlaces.ts";
import CreateAccountModal from "@/components/modals/CreateAccountModal.tsx";

export default async function Landing() {
  const welcome_to_gravl = await filterPlacesByType(
    "welcome_to_gravl",
    "counties"
  );

  return (
    <>
      <CreateAccountModal />
      <Header />
      <div className={styles.mainContainer}>
        <div className={styles.map}>
          <Counties data={welcome_to_gravl} pause={5} />
        </div>
        <p className={styles.motto}>Track your travels.</p>
        <SignUpButton />
      </div>
    </>
  );
}
