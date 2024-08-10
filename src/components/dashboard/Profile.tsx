import { unfriendUsers } from "@/actions/actions";
import styles from "../../styles/profile.module.scss";
import { useRouter } from "next/navigation";
import EditProfileButton from "./EditProfileButton";
import UserStats from "./UserStats";
import { Mode, TripWithVisits, UserWithTrips } from "@/utils/types";
import { User } from "@prisma/client";
import Icon from "../icons/Icon";

export default function Profile({
  user,
  mode,
  viewer,
  setEditProfile,
  trips,
}: {
  user: UserWithTrips;
  mode: Mode;
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

  const handleAddFriend = () => {};

  return (
    <div className={styles.profile}>
      <div className={styles.pfpContainer}>
        <img src={user!.image!} alt="PFP" />
      </div>
      <div className={styles.userInfo}>
        <div className={styles.usernameAndEdit}>
          <p className={styles.username}>{user!.username}</p>
          {mode === "USER" && (
            <div className={styles.edit}>
              <EditProfileButton setEditProfile={setEditProfile!} />
            </div>
          )}
        </div>
        <p className={styles.location}>{user!.location}</p>
        <p className={styles.bio}>{user!.bio}</p>
        {mode === "FRIEND" && (
          <button className={styles.unfriendBtn} onClick={handleUnfriend}>
            Unfriend
          </button>
        )}
        {mode === "NON-FRIEND" && (
          // <button className={styles.addFriendBtn} onClick={handleAddFriend}>
          //   <div className={styles.plus}>
          //     <Icon type="plus" fill="#fff" />
          //   </div>
          //   <p>Add Friend</p>
          // </button>
          <p className={styles.signInToView}>Add Friend To View Full Profile</p>
        )}
        {mode === "NON-USER" && (
          <p className={styles.signInToView}>Sign In To View Full Profile</p>
        )}
      </div>
      <UserStats trips={trips} />
    </div>
  );
}
