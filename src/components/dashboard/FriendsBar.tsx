import { useState } from "react";
import styles from "../../styles/friendsbar.module.scss";
import Icon from "../icons/Icon";
import FriendModal from "../modals/FriendModal";

export default function FriendsBar() {
  const mock_friends: any[] = [
    // {
    //   username: "alexkranias",
    //   pfp: "https://lh3.googleusercontent.com/a/ACg8ocIqbg9wxEZW54RHn0lzTXFudOwYXNp7hgUjeQj7Edf74Jm8BDY5tA=s96-c",
    //   unopened: true,
    // },
    // {
    //   username: "sparkerly",
    //   pfp: "https://lh3.googleusercontent.com/a/ACg8ocKiFo3cCOvh2eyedgrCUK_U9NCH_gBBuVBYqszpuxllsXQBaIQ=s96-c",
    //   unopened: true,
    // },
    // {
    //   username: "ayush",
    //   pfp: "https://lh3.googleusercontent.com/a/ACg8ocKsOQn3L7UzQc3BsPoe0IROHN7qleVqLqjUWkbzVEU8RgPakYdkxQ=s96-c",
    //   unopened: false,
    // },
    // {
    //   username: "obamna",
    //   pfp: "https://lh3.googleusercontent.com/a/ACg8ocLr2tt5svEVc6UqIwRFpbKrRQFt9gJ_-zRTYhZdmY_sTYgUsym8=s96-c",
    //   unopened: false,
    // },
  ];

  const [addFriendModal, setAddFriendModal] = useState(false);
  const [searchFriendModal, setSearchFriendModal] = useState(false);

  const sendFriendRequest = (username: string) => {
    console.log(`Sending friend request to ${username}...`);
    setAddFriendModal(false);
  };

  const findFriend = (username: string) => {
    console.log(`Finding ${username}...`);
    setSearchFriendModal(false);
  };

  return (
    <div className={styles.container}>
      {addFriendModal && (
        <FriendModal
          prompt="Send a Friend Request"
          inputPlaceholder="Enter a username..."
          setClose={() => setAddFriendModal(false)}
          submitCallback={sendFriendRequest}
        />
      )}
      {searchFriendModal && (
        <FriendModal
          prompt="Search for a Friend"
          inputPlaceholder="Enter a username..."
          setClose={() => setSearchFriendModal(false)}
          submitCallback={findFriend}
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
          {mock_friends.length === 0 && (
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
        {mock_friends.map((friend, index) => {
          return (
            <div className={styles.friend} key={index}>
              <img src={friend.pfp} alt="PFP" className={styles.pfp} />
              <p className={styles.username}>{friend.username}</p>
              {friend.unopened && <div className={styles.unopened}></div>}
            </div>
          );
        })}
      </div>
    </div>
  );
}
