import styles from "../../styles/profile.module.scss";
import EditProfileButton from "./EditProfileButton";
import UserStats from "./UserStats";
import { Mode, TripWithVisits, UserWithTrips } from "@/utils/types";

export default function Profile({
  user,
  mode,
  setEditProfile,
  trips,
}: {
  user: UserWithTrips;
  mode: Mode;
  setEditProfile?: Function;
  trips: TripWithVisits[];
}) {
  return (
    <div className={styles.profile}>
      <div className={styles.pfpContainer}>
        <img src={user.image!} alt="PFP" />
      </div>
      <div className={styles.userInfo}>
        <div className={styles.usernameAndEdit}>
          <p className={styles.username}>{user.username}</p>
          {setEditProfile && (
            <div className={styles.edit}>
              <EditProfileButton setEditProfile={setEditProfile} />
            </div>
          )}
        </div>
        {(user.location || mode === "USER") && (
          <p className={styles.location}>{user.location || "Add a location"}</p>
        )}
        {(user.bio || mode === "USER") && (
          <p className={styles.bio}>{user.bio || "Add a bio"}</p>
        )}
      </div>
      <UserStats trips={trips} />
    </div>
  );
}
