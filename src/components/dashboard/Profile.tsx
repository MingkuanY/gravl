import { unfriendUsers } from "@/actions/actions";
import styles from "../../styles/profile.module.scss";
import { useRouter } from "next/navigation";
import EditProfileButton from "./EditProfileButton";
import UserStats from "./UserStats";
import { TripWithVisits, UserWithTrips } from "@/utils/types";
import { User } from "@prisma/client";

export default function Profile({
  user,
  viewOnly,
  viewer,
  setEditProfile,
  trips,
}: {
  user: UserWithTrips;
  viewOnly: boolean;
  viewer?: User;
  setEditProfile?: Function;
  trips: TripWithVisits[];
}) {
  const router = useRouter();

  const handleUnfriend = () => {
    if (viewer) {
      unfriendUsers(user.id, viewer.id);
      router.push(`/${viewer.username!}`);
    }
  };

  return (
    <div className={styles.profile}>
      <div className={styles.pfpContainer}>
        <img src={user!.image!} alt="PFP" />
      </div>
      <div className={styles.userInfo}>
        <div className={styles.usernameAndEdit}>
          <p className={styles.username}>{user!.username}</p>
          {!viewOnly && setEditProfile && (
            <div className={styles.edit}>
              <EditProfileButton setEditProfile={setEditProfile} />
            </div>
          )}
        </div>
        <p className={styles.location}>{user!.location}</p>
        <p className={styles.bio}>{user!.bio}</p>
        {viewOnly && viewer && (
          <button className={styles.unfriendBtn} onClick={handleUnfriend}>
            Unfriend
          </button>
        )}
      </div>
      <UserStats trips={trips} />
    </div>
  );
}
