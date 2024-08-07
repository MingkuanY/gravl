import { useState } from "react";
import styles from "../../styles/friendsbar.module.scss";
import Icon from "../icons/Icon";
import FriendModal from "../modals/FriendModal";
import { UserWithData } from "@/utils/types";
import { sendFriendRequest } from "@/actions/actions";
import { useRouter } from "next/navigation";

export default function FriendsBar({ user }: { user: UserWithData }) {
  const router = useRouter();

  const [friends, setFriends] = useState(user ? user.friends : []);

  const [addFriendModal, setAddFriendModal] = useState(false);
  const [searchFriendModal, setSearchFriendModal] = useState(false);

  const [status, setStatus] = useState("DEFAULT");

  const requestFriend = async (username: string) => {
    if (username !== user.username) {
      setStatus("PENDING");
      const success = await sendFriendRequest(user.id, username);
      setStatus(success ? "SUCCESS" : "FAILURE");
    } else {
      setAddFriendModal(false);
    }
  };

  const findFriend = async (username: string) => {
    if (username !== user.username) {
      setStatus("PENDING");
      const success = friends.some((friend) => friend.username === username);
      if (success) {
        router.push(`/${username}`);
      } else {
        setStatus("FAILURE");
      }
    } else {
      setAddFriendModal(false);
    }
  };

  const clickFriend = (index: number) => {
    const username = friends[index].username;
    router.push(`/${username}`);
  };

  return (
    <div className={styles.container}>
      {addFriendModal && (
        <FriendModal
          prompt="Send a Friend Request"
          inputPlaceholder="Enter a username..."
          setClose={() => setAddFriendModal(false)}
          submitCallback={requestFriend}
          status={status}
          setStatus={setStatus}
        />
      )}
      {searchFriendModal && (
        <FriendModal
          prompt="Search for a Friend"
          inputPlaceholder="Enter a username..."
          setClose={() => setSearchFriendModal(false)}
          submitCallback={findFriend}
          status={status}
          setStatus={setStatus}
        />
      )}
      <div className={styles.btnSection}>
        <button
          className={styles.addFriendBtn}
          onClick={() => setAddFriendModal(true)}
        >
          <div className={styles.plus}>
            <Icon type="plus" fill="#fff" />
          </div>
          {friends.length === 0 && (
            <div className={styles.noFriendsContainer}>
              <p className={styles.noFriends}>Add Your Friends</p>
              <div className={styles.up_arrow}>
                <Icon type="up_arrow" fill="#319fff" />
              </div>
            </div>
          )}
        </button>
        <button
          className={styles.searchFriendBtn}
          onClick={() => setSearchFriendModal(true)}
        >
          <div className={styles.search}>
            <Icon type="search" fill="#319fff" />
          </div>
        </button>
      </div>
      <div className={styles.friendsSection}>
        {friends.map((friend, index) => {
          return (
            <div
              className={styles.friend}
              key={index}
              onClick={() => clickFriend(index)}
            >
              <img
                src={friend?.image as string}
                alt="PFP"
                className={styles.pfp}
              />
              <p className={styles.username}>{friend.username}</p>
              {false && <div className={styles.unopened}></div>}
            </div>
          );
        })}
      </div>
    </div>
  );
}
