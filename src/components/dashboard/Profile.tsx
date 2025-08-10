import { useProfileContext } from "../../contexts/ProfileContext";
import styles from "../../styles/profile.module.scss";
import EditProfileButton from "./EditProfileButton";
import UserStats from "./UserStats";
import { TripWithVisits } from "@/utils/types";

export default function Profile({
  setEditProfile,
  trips,
}: {
  setEditProfile: Function;
  trips: TripWithVisits[];
}) {
  const { viewingUser, isOwner } = useProfileContext();

  return (
    <div className={styles.profile}>
      <div className={styles.pfpContainer}>
        <img src={viewingUser!.image!} alt="PFP" />
      </div>
      <div className={styles.userInfo}>
        <div className={styles.usernameAndEdit}>
          <p className={styles.username}>{viewingUser!.username}</p>
          {isOwner && (
            <div className={styles.edit}>
              <EditProfileButton setEditProfile={setEditProfile} />
            </div>
          )}
        </div>
        {(viewingUser!.location || isOwner) && (
          <p className={styles.location}>
            {viewingUser!.location || "Add a location"}
          </p>
        )}
        {(viewingUser!.bio || isOwner) && (
          <p className={styles.bio}>{viewingUser!.bio || "Add a bio"}</p>
        )}
      </div>
      <UserStats trips={trips} />
    </div>
  );
}
