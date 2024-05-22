// Welcome to Gravl

import styles from "../styles/landing.module.scss";
import Header from "@/components/header/Header.tsx";
import Counties from "../components/maps/Counties.tsx";
import NotFound from "./not-found.tsx";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route.ts";
import SignUpButton from "@/components/landing/SignUpButton.tsx";
import { filterPlacesByType } from "@/lib/getPlaces.ts";
import CreateAccountModal from "@/components/modals/CreateAccountModal.tsx";
import { getUser } from "@/lib/getUser.ts";

export default async function Landing() {
  const session = await getServerSession(authOptions);
  const userId = session?.user.id;
  if (!userId) {
    return NotFound();
  }
  const user = await getUser(userId);

  const welcome_to_gravl = await filterPlacesByType(
    "welcome_to_gravl",
    "counties"
  );

  return (
    <>
      <Header />
      <div className={styles.mainContainer}>
        <div className={styles.map}>
          <Counties data={welcome_to_gravl} pause={5} />
        </div>
        <p className={styles.motto}>Track your travels.</p>
        <SignUpButton username={user!.username} />
      </div>
    </>
  );
}
