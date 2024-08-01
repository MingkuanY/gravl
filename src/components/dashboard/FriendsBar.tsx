import styles from "../../styles/friendsbar.module.scss";
import Icon from "../icons/Icon";

export default function FriendsBar() {
  const mock_friends = [
    {
      username: "alexkranias",
      pfp: "https://lh3.googleusercontent.com/a/ACg8ocIqbg9wxEZW54RHn0lzTXFudOwYXNp7hgUjeQj7Edf74Jm8BDY5tA=s96-c",
      unopened: true,
    },
    {
      username: "sparkerly",
      pfp: "https://lh3.googleusercontent.com/a/ACg8ocKiFo3cCOvh2eyedgrCUK_U9NCH_gBBuVBYqszpuxllsXQBaIQ=s96-c",
      unopened: true,
    },
    {
      username: "ayush",
      pfp: "https://lh3.googleusercontent.com/a/ACg8ocKsOQn3L7UzQc3BsPoe0IROHN7qleVqLqjUWkbzVEU8RgPakYdkxQ=s96-c",
      unopened: false,
    },
    {
      username: "obamna",
      pfp: "https://lh3.googleusercontent.com/a/ACg8ocLr2tt5svEVc6UqIwRFpbKrRQFt9gJ_-zRTYhZdmY_sTYgUsym8=s96-c",
      unopened: false,
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.btnSection}>
        <button className={styles.addFriendBtn}>
          <div className={styles.plus}>
            <Icon type="plus" fill="#fff" />
          </div>
        </button>
        <button className={styles.searchFriendBtn}>
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
