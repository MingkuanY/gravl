import styles from "../../styles/dashboard.module.scss";
import Header from "@/components/header/Header";
import EditProfileButton from "@/components/dashboard/EditProfileButton";
import MapLoader from "@/components/dashboard/MapLoader";
import { getUser, getUserWithTripsAndVisits } from "@/lib/user.ts";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route.ts";
import { getPlacesByUserAndType } from "@/lib/visit";
import NotFound from "../not-found";
import UserStats from "@/components/dashboard/UserStats";
import NewTrip from "@/components/modals/NewTrip";

export default async function Dashboard({
  params,
  searchParams,
}: {
  params: { username: string };
  searchParams: { log: string };
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    //user not logged in
    return NotFound();
  }

  const userEmail = session.user.email;
  const user = await getUser(userEmail);
  const userWithTripsAndVisits = await getUserWithTripsAndVisits(userEmail);

  if (!user || !userWithTripsAndVisits || user.username !== params.username) {
    //user not logged into the account they are trying to access
    return NotFound();
  }

  const counties = await getPlacesByUserAndType(user.id, "counties");
  const states = await getPlacesByUserAndType(user.id, "states");
  const countries = await getPlacesByUserAndType(user.id, "countries");
  const nationalparks = await getPlacesByUserAndType(user.id, "nationalparks");

  return (
    <>
      {searchParams.log && <NewTrip user={user} searchParams={searchParams} />}
      <Header user={user} />

      {!searchParams.log && (
        <div className={styles.main}>
          <div className={styles.profile}>
            <div className={styles.pfpContainer}>
              <img src={user!.image!} alt="PFP" />
            </div>
            <div className={styles.userInfo}>
              <div className={styles.usernameAndEdit}>
                <p className={styles.username}>{user!.username}</p>
                <div className={styles.edit}>
                  <EditProfileButton />
                </div>
              </div>
              <p className={styles.location}>{user!.location}</p>
              <p className={styles.bio}>{user!.bio}</p>
            </div>
            <UserStats trips={userWithTripsAndVisits.trips} />
          </div>

          <MapLoader
            counties={counties}
            states={states}
            countries={countries}
            nationalparks={nationalparks}
          />
        </div>
      )}
    </>
  );
}
