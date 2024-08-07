import { acceptFriendRequest, declineFriendRequest } from "@/actions/actions";
import styles from "../../styles/notification.module.scss";
import { Notification as Notif, User } from "@prisma/client";
import { formatNotificationTime } from "@/utils/date";
import { useRouter } from "next/navigation";

export default function Notification({
  notifications,
  notification,
  index,
  userDetails,
}: {
  notifications: Notif[];
  notification: Notif;
  index: number;
  userDetails: { [key: string]: User };
}) {
  const router = useRouter();

  const handleRequest = async (requestId: number | null, response: boolean) => {
    if (!requestId) {
      return;
    }
    if (response) {
      // Accept friend request
      await acceptFriendRequest(requestId);
    } else {
      // Decline friend request
      await declineFriendRequest(requestId);
    }
  };

  const currUser = notification.userIdInConcern
    ? userDetails[notification.userIdInConcern]
    : null;
  const showDate =
    index === 0 ||
    notifications[index - 1].createdAt.getDate() !==
      notification.createdAt.getDate();

  let message = "";
  switch (notification.type) {
    case "FRIEND_REQUEST":
      message = "sent a friend request";
      break;
    case "FRIEND_REQUEST_ACCEPTED":
      message = "accepted your friend request";
      break;
    case "FRIEND_FINISHED_TRIP":
      message = "finished a trip";
      break;
  }
  return (
    <div className={styles.container} key={index}>
      {showDate && (
        <p className={styles.date}>
          {formatNotificationTime(notification.createdAt)}
        </p>
      )}

      <p className={styles.text}>
        <span
          onClick={() => {
            router.push(`/${currUser?.username}`);
          }}
        >
          {currUser?.username}
        </span>{" "}
        {message}
      </p>
      {notification.type === "FRIEND_REQUEST" && (
        <div className={styles.btns}>
          <button
            className={styles.accept}
            onClick={() => handleRequest(notification.requestId, true)}
          >
            Accept
          </button>
          <button
            className={styles.decline}
            onClick={() => handleRequest(notification.requestId, false)}
          >
            Decline
          </button>
        </div>
      )}
    </div>
  );
}
