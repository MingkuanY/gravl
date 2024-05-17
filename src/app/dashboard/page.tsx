import styles from "../../styles/dashboard.module.scss";
import Header from "@/components/header/Header";
import EditProfileButton from "@/components/dashboard/EditProfileButton";
import MapLoader from "@/components/dashboard/MapLoader";
import { getUser } from "@/lib/getUser";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route.ts";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);
  const userId = session?.user.id;
  const user = await getUser(userId);

  return (
    <>
      <Header />

      <div className={styles.main}>
        <div className={styles.profile}>
          <div className={styles.pfpContainer}>
            <img src={user!.pfp!} alt="PFP" />
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
              <p className={styles.stat}>11</p>
              <p className={styles.desc}>Trips</p>
            </div>
            <div>
              <p className={styles.stat}>4</p>
              <p className={styles.desc}>This Year</p>
            </div>
          </div>
        </div>

        <MapLoader />
      </div>
    </>
  );
}
