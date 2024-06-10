import styles from "../../styles/dashboard.module.scss";
import Header from "@/components/header/Header";
import EditProfileButton from "@/components/dashboard/EditProfileButton";
import MapLoader from "@/components/dashboard/MapLoader";
import { getUser } from "@/lib/getUser";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route.ts";
import { filterPlacesByType } from "@/lib/getPlaces";
import NotFound from "../not-found";

export default async function Dashboard({
  params,
}: {
  params: { username: string };
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    //user not logged in
    return NotFound();
  }

  const userEmail = session.user.email;
  const user = await getUser(userEmail);

  if (!user || user.username !== params.username) {
    //user not logged into the account they are trying to access
    return NotFound();
  }

  const counties = await filterPlacesByType(user.id, "counties");
  const states = await filterPlacesByType(user.id, "states");
  const countries = await filterPlacesByType(user.id, "countries");
  const nationalparks = await filterPlacesByType(user.id, "nationalparks");

  // hardcoded user stats
  const miles = 13351;
  const thisYear = 2290;

  const renderStat = (stat: number) => {
    if (stat > 999) {
      const number = Math.round(stat / 100) / 10;
      return (
        <p className={styles.stat}>
          {number}
          <span>k</span>
        </p>
      );
    }
    return <p className={styles.stat}>{stat}</p>;
  };

  return (
    <>
      <Header />

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
          <div className={styles.userStats}>
            <div>
              {renderStat(miles)}
              <p className={styles.desc}>Miles</p>
            </div>
            <div>
              {renderStat(thisYear)}
              <p className={styles.desc}>This Year</p>
            </div>
          </div>
        </div>

        <MapLoader
          counties={counties}
          states={states}
          countries={countries}
          nationalparks={nationalparks}
        />
      </div>
    </>
  );
}
