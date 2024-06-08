import styles from "../../styles/dashboard.module.scss";
import Header from "@/components/header/Header";
import EditProfileButton from "@/components/dashboard/EditProfileButton";
import MapLoader from "@/components/dashboard/MapLoader";
import { getUser } from "@/lib/getUser";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth].ts";
import { filterPlacesByType } from "@/lib/getPlaces";
import NotFound from "../not-found";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);
  const userId = session?.user.id;
  if (!userId) {
    return NotFound();
  }
  const user = await getUser(userId);

  const counties = await filterPlacesByType(userId, "counties");
  const states = await filterPlacesByType(userId, "states");
  const countries = await filterPlacesByType(userId, "countries");
  const nationalparks = await filterPlacesByType(userId, "nationalparks");

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
